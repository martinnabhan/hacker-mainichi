import { get } from 'env-var';

export const TableName = get('DYNAMO_DB_TABLE_NAME').required().asString();

export * from './client';
