import { BatchGetCommand, BatchWriteCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { today } from '@hacker-mainichi/client/lib';
import { TableName, client } from '@hacker-mainichi/dynamodb';
import { Resolvers, Story } from '@hacker-mainichi/graphql/types';

const chunkSize = 25;

const resolvers: Pick<Resolvers, 'Story'> & {
  Mutation: Pick<Resolvers['Mutation'], 'visit'>;
  Query: Pick<Resolvers['Query'], 'visited'>;
} = {
  Mutation: {
    visit: async (_, { date, ids }, { user }) => {
      const idChunks = [];
      const stories: Story[] = [];

      for (let i = 0; i < ids.length; i += chunkSize) {
        idChunks.push(ids.slice(i, i + chunkSize));
      }

      if (date === today) {
        const responses = await Promise.all(
          ids.map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)),
        );

        const apiStories: (ApiStory | null)[] = await Promise.all(
          responses.map(apiStoryResponse => apiStoryResponse.json()),
        );

        for (const apiStory of apiStories) {
          if (apiStory !== null && apiStory.type === 'story') {
            stories.push({
              id: apiStory.id,
              title: apiStory.title,
            });
          }
        }
      } else {
        await Promise.all(
          idChunks.map(async chunkIds => {
            const result = await client.send(
              new BatchGetCommand({
                RequestItems: {
                  [TableName]: {
                    Keys: chunkIds.map(id => ({
                      pk: `STORY#${date}`,
                      sk: `STORY#${id}`,
                    })),
                    ProjectionExpression: 'sk, title',
                  },
                },
              }),
            );

            if (!result.Responses) {
              throw new Error('ストーリを取得出来ませんでした。');
            }

            for (const { sk, title } of result.Responses[TableName]) {
              stories.push({
                id: Number(sk.split('#')[1]),
                title,
              });
            }
          }),
        );
      }

      const storyChunks = [];

      for (let i = 0; i < stories.length; i += chunkSize) {
        storyChunks.push(stories.slice(i, i + chunkSize));
      }

      await Promise.all(
        storyChunks.map(async chunkStories =>
          client.send(
            new BatchWriteCommand({
              RequestItems: {
                [TableName]: chunkStories.map(({ id, title }) => ({
                  PutRequest: {
                    Item: {
                      pk: `USER#${user.email}`,
                      sk: `STORY#${date}#STORY#${id}`,
                      title,
                    },
                  },
                })),
              },
            }),
          ),
        ),
      );

      return stories;
    },
  },
  Query: {
    visited: async (_, { date }, { user }) => {
      const result = await client.send(
        new QueryCommand({
          ExpressionAttributeValues: {
            ':pk': `USER#${user.email}`,
            ':sk': `STORY#${date}`,
          },
          KeyConditionExpression: 'pk = :pk AND begins_with(sk, :sk)',
          TableName,
        }),
      );

      if (!result.Items) {
        throw new Error('ストーリを取得出来ませんでした。');
      }

      return (result.Items as UserVisitedStory[]).map(({ sk, title }) => ({
        id: Number(sk.slice(sk.lastIndexOf('#') + 1)),
        title,
      }));
    },
  },
  Story: {
    id: ({ id }) => id,
    title: ({ title }) => title,
  },
};

export { resolvers };
