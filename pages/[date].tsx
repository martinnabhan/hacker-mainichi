import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { DynamoDB } from 'aws-sdk';
import { dates } from '@hacker-mainichi/lib/dates';
import { getFormattedDate } from '@hacker-mainichi/lib/getFormattedDate';
import { Stories } from '@hacker-mainichi/components/Stories';

interface Props {
  stories: Story[];
}

const Date: NextPage<Props> = ({ stories }) => <Stories stories={stories} />;

const getStaticPaths: GetStaticPaths = async () => ({
  paths: dates.map(date => ({ params: { date: getFormattedDate(date) } })),
  fallback: false,
});

const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const { date } = params as { date: string };

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
        '#by': 'by',
        '#date': 'date',
      },
      ExpressionAttributeValues: {
        ':date': date,
      },
      KeyConditionExpression: '#date = :date',
      ProjectionExpression: 'id, #by, comments, score, title',
      TableName: process.env.DYNAMO_DB_TABLE_NAME as string,
    })
    .promise();

  const stories = (result.Items as Story[]).filter(({ score }) => score >= 10).sort((a, b) => b.score - a.score);

  return {
    props: {
      stories,
    },
  };
};

export { getStaticPaths, getStaticProps };

export default Date;
