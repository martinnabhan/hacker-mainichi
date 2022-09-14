import { DynamoDB } from 'aws-sdk';

const fetchStories = async (date: string) => {
  const client = new DynamoDB.DocumentClient({
    credentials: {
      accessKeyId: process.env.HACKER_MAINICHI_AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.HACKER_MAINICHI_AWS_SECRET_ACCESS_KEY as string,
    },
    endpoint: process.env.HACKER_MAINICHI_DYNAMO_DB_ENDPOINT,
    region: process.env.HACKER_MAINICHI_AWS_REGION,
  });

  const result = await client
    .query({
      ExpressionAttributeNames: {
        '#date': 'date',
      },
      ExpressionAttributeValues: {
        ':date': date,
      },
      KeyConditionExpression: '#date = :date',
      ProjectionExpression: 'id, comments, score, title',
      TableName: process.env.DYNAMO_DB_TABLE_NAME as string,
    })
    .promise();

  return (result.Items as Story[]).filter(({ score }) => score >= 10).sort((a, b) => b.score - a.score);
};

export { fetchStories };
