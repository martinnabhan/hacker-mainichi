/* eslint-disable no-console */
import { TableName, isDevelopment } from '../settings';
import { CreateTableCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { BatchWriteCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

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

const client = DynamoDBDocumentClient.from(new DynamoDBClient(isDevelopment ? devOptions : {}));

const db = {
  createTable: async () => {
    console.log(`Creating table ${TableName}...`);

    await DynamoDBDocumentClient.from(new DynamoDBClient(devOptions)).send(
      new CreateTableCommand({
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
      }),
    );

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
        client.send(
          new BatchWriteCommand({
            RequestItems: {
              [TableName]: chunkStories.map(Item => ({
                PutRequest: {
                  Item,
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
