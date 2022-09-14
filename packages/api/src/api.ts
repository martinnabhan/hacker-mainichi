import { AttributeType, BillingMode, Table } from '@aws-cdk/aws-dynamodb';
import { Rule, Schedule } from '@aws-cdk/aws-events';
import { LambdaFunction } from '@aws-cdk/aws-events-targets';
import { NodejsFunction } from '@aws-cdk/aws-lambda-nodejs';
import { RetentionDays } from '@aws-cdk/aws-logs';
import { App, Duration, RemovalPolicy, Stack } from '@aws-cdk/core';
import { TableName as tableName, VERCEL_DEPLOY_HOOK_URL } from './settings';

const environment = {
  DYNAMO_DB_TABLE_NAME: tableName,
  NODE_OPTIONS: '--enable-source-maps',
  TZ: 'Asia/Tokyo',
  VERCEL_DEPLOY_HOOK_URL,
};

class API extends Stack {
  constructor(scope: App, id: string) {
    super(scope, id);

    const saveStories = new NodejsFunction(this, 'saveStories', {
      bundling: {
        minify: true,
        sourceMap: true,
      },
      environment,
      logRetention: RetentionDays.ONE_WEEK,
      timeout: Duration.minutes(15),
    });

    // 毎日 JST 00:01 に実行したいですが、UTC なので 15:01
    const schedule = new Rule(this, 'Rule', { schedule: Schedule.cron({ hour: '15', minute: '1' }) });

    const table = new Table(this, 'Table', {
      billingMode: BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: 'date', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      sortKey: { name: 'id', type: AttributeType.NUMBER },
      tableName,
    });

    schedule.addTarget(new LambdaFunction(saveStories));
    table.grantReadWriteData(saveStories);
  }
}

const app = new App();

new API(app, 'HackerMainichiAPI');

app.synth();
