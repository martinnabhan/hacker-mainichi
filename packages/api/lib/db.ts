/* eslint-disable no-console */
import { CreateTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { BatchWriteCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { TableName, isDevelopment } from '@hacker-mainichi/api/settings';

const chunkSize = 25;

const devOptions = {
  credentials: {
    accessKeyId: 'key',
    secretAccessKey: 'key',
  },
  endpoint: 'http://localhost:8000',
  region: 'us-east-1',
};

const client = DynamoDBDocumentClient.from(new DynamoDBClient(isDevelopment ? devOptions : {}));

const db = {
  createTable: async () => {
    console.log(`Creating table ${TableName}...`);

    await DynamoDBDocumentClient.from(new DynamoDBClient(devOptions)).send(
      new CreateTableCommand({
        AttributeDefinitions: [
          { AttributeName: 'pk', AttributeType: 'pk' },
          { AttributeName: 'sk', AttributeType: 'sk' },
        ],
        BillingMode: 'PAY_PER_REQUEST',
        KeySchema: [
          { AttributeName: 'pk', KeyType: 'HASH' },
          { AttributeName: 'sk', KeyType: 'RANGE' },
        ],
        TableName,
      }),
    );

    console.log(`Created table ${TableName}.`);
  },
  saveStories: async ({ date, stories }: { date: string; stories: Story[] }) => {
    console.log(`Batch writing ${stories.length} stories...`);

    const storyChunks: Story[][] = [];

    for (let i = 0; i < stories.length; i += chunkSize) {
      storyChunks.push(stories.slice(i, i + chunkSize));
    }

    await Promise.all(
      storyChunks.map(async chunkStories =>
        client.send(
          new BatchWriteCommand({
            RequestItems: {
              [TableName]: chunkStories.map(({ comments, id, score, title }) => ({
                PutRequest: {
                  Item: {
                    comments,
                    pk: `STORY#${date}`,
                    score,
                    sk: `STORY#${id}`,
                    title,
                  },
                },
              })),
            },
          }),
        ),
      ),
    );

    console.log(`Batch wrote ${stories.length} stories.`);
  },
};

export { db };
