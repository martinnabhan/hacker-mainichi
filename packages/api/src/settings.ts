import env from 'env-var';

env.get('NODE_OPTIONS').required();
env.get('TZ').required();

export const isDevelopment = env.get('NODE_ENV').asString() === 'development';
export const DATE = env.get('DATE').asString();
export const TableName = isDevelopment ? 'hacker-mainichi' : env.get('DYNAMO_DB_TABLE_NAME').required().asString();
export const VERCEL_DEPLOY_HOOK_URL = env.get('VERCEL_DEPLOY_HOOK_URL').required().asString();
