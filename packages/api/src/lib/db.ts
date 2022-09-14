/* eslint-disable no-console */
import { DynamoDB } from 'aws-sdk';
import { isDevelopment, TableName } from '../settings';

interface Story {
  by: string;
  comments: number;
  id: number;
  score: number;
  title: string;
}

interface DBStory extends Story {
  date: string;
}

const chunkSize = 25;

const devOptions = {
  credentials: {
    accessKeyId: 'key',
    secretAccessKey: 'key',
  },
  endpoint: 'http://localhost:8000',
  region: 'us-east-1',
};

const client = new DynamoDB.DocumentClient(isDevelopment ? devOptions : undefined);

const db = {
  createTable: async () => {
    console.log(`Creating table ${TableName}...`);

    await new DynamoDB(devOptions)
      .createTable({
        AttributeDefinitions: [
          { AttributeName: 'date', AttributeType: 'S' },
          { AttributeName: 'id', AttributeType: 'N' },
        ],
        BillingMode: 'PAY_PER_REQUEST',
        KeySchema: [
          { AttributeName: 'date', KeyType: 'HASH' },
          { AttributeName: 'id', KeyType: 'RANGE' },
        ],
        TableName,
      })
      .promise();

    console.log(`Created table ${TableName}.`);
  },
  saveStories: async ({ stories }: { stories: DBStory[] }) => {
    console.log(`Batch writing ${stories.length} stories...`);

    const storyChunks: DBStory[][] = [];

    for (let i = 0; i < stories.length; i += chunkSize) {
      storyChunks.push(stories.slice(i, i + chunkSize));
    }

    await Promise.all(
      storyChunks.map(async chunkStories =>
        client
          .batchWrite({
            RequestItems: {
              [TableName]: chunkStories.map(Item => ({
                PutRequest: {
                  Item,
                },
              })),
            },
          })
          .promise(),
      ),
    );

    console.log(`Batch wrote ${stories.length} stories.`);
  },
};

export { db };
