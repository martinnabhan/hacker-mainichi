import { VERCEL_DEPLOY_HOOK_URL, TableName as tableName } from './settings';
import { App, Duration, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Rule, Schedule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';

const environment = {
  DYNAMO_DB_TABLE_NAME: tableName,
  NODE_OPTIONS: '--enable-source-maps',
  TZ: 'Asia/Tokyo',
  VERCEL_DEPLOY_HOOK_URL,
};

class HackerMainichi extends Stack {
  constructor(scope: App, id: string) {
    super(scope, id);

    const saveStories = new NodejsFunction(this, 'saveStories', {
      architecture: Architecture.ARM_64,
      bundling: {
        minify: true,
        sourceMap: true,
      },
      environment,
      logRetention: RetentionDays.ONE_WEEK,
      runtime: Runtime.NODEJS_16_X,
      timeout: Duration.minutes(15),
    });

    // 毎日 JST 00:01 に実行したいですが、UTC なので 15:01
    const schedule = new Rule(this, 'Rule', { schedule: Schedule.cron({ hour: '15', minute: '1' }) });

    const table = new Table(this, 'Table', {
      billingMode: BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: 'pk', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY,
      sortKey: { name: 'sk', type: AttributeType.STRING },
      tableName,
      timeToLiveAttribute: 'expires',
    });

    schedule.addTarget(new LambdaFunction(saveStories));
    table.grantReadWriteData(saveStories);
  }
}

const app = new App();

// eslint-disable-next-line no-new
new HackerMainichi(app, 'HackerMainichi');

app.synth();
