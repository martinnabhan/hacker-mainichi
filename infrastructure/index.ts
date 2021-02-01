import { CloudFrontWebDistribution, OriginAccessIdentity, PriceClass } from '@aws-cdk/aws-cloudfront';
import { PolicyStatement } from '@aws-cdk/aws-iam';
import { Bucket } from '@aws-cdk/aws-s3';
import { App, Stack } from '@aws-cdk/core';

class Client extends Stack {
  constructor(scope: App, id: string) {
    super(scope, id);

    const bucket = new Bucket(this, 'Bucket');
    const originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity');
    const policyStatement = new PolicyStatement();

    new CloudFrontWebDistribution(this, 'Distribution', {
      priceClass: PriceClass.PRICE_CLASS_ALL,
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
            originAccessIdentity,
          },
          behaviors: [{ isDefaultBehavior: true }],
        },
      ],
    });

    policyStatement.addActions('s3:GetBucket*', 's3:GetObject*', 's3:List*');
    policyStatement.addResources(bucket.bucketArn, `${bucket.bucketArn}/*`);
    policyStatement.addCanonicalUserPrincipal(originAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId);

    bucket.addToResourcePolicy(policyStatement);
  }
}

const app = new App();

new Client(app, 'HackerMainichiClient');

app.synth();
