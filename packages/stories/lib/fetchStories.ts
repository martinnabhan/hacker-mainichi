import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { TableName, client } from '@hacker-mainichi/dynamodb';

const fetchStories = async (date: string): Promise<Story[]> => {
  const result = await client.send(
    new QueryCommand({
      ExpressionAttributeValues: {
        ':pk': `STORY#${date}`,
      },
      KeyConditionExpression: 'pk = :pk',
      TableName,
    }),
  );

  if (!result.Items) {
    throw new Error('ストーリを取得出来ませんでした。');
  }

  return (result.Items as DBStory[])
    .filter(({ score }) => score >= 10)
    .sort((a, b) => b.score - a.score)
    .map(({ comments, score, sk, title }) => ({
      comments,
      id: Number(sk.split('#')[1]),
      score,
      title,
    }));
};

export { fetchStories };
