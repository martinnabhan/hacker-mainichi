import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { get } from 'env-var';

const client = DynamoDBDocumentClient.from(
  new DynamoDBClient({
    credentials: {
      accessKeyId: get('HACKER_MAINICHI_AWS_ACCESS_KEY_ID').required().asString(),
      secretAccessKey: get('HACKER_MAINICHI_AWS_SECRET_ACCESS_KEY').required().asString(),
    },
    endpoint: get('HACKER_MAINICHI_DYNAMO_DB_ENDPOINT').asString(),
    region: get('HACKER_MAINICHI_AWS_REGION').required().asString(),
  }),
);

export { client };
