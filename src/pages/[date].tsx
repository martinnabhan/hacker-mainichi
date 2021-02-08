import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { State } from '../app/reducer';
import { dates, getDayFromDate, selectDay, todayDate } from '../modules/days';
import { Stories, Story, topStories } from '../modules/stories';
import { DynamoDB } from 'aws-sdk';
import { useSelector } from 'react-redux';

const Date = () => {
  const day = useSelector(selectDay);

  return (
    <>
      <Head>
        <title>ハッカー毎日 | {day}曜日</title>
      </Head>

      <Stories />
    </>
  );
};

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

  const stories = (result.Items as Story[])
    .filter(({ score }) => score >= 10)
    .sort((a, b) => (a.score > b.score ? -1 : 1));

  return stories;
};

const getStaticPaths: GetStaticPaths = async () => ({
  paths: dates.map(date => ({ params: { date } })),
  fallback: false,
});

const getStaticProps: GetStaticProps<{ initialState: State }> = async ({ params }) => {
  const { date } = params as { date: string };

  const dateStories = await fetchStories(date);

  const stories: Omit<State['stories'], 'topStories'> = dates.reduce(
    (stories, storyDate) => ({
      ...stories,
      [storyDate]:
        storyDate === date
          ? {
              ids: dateStories.map(({ id }) => id),
              entities: dateStories.reduce<State['stories'][string]['entities']>(
                (entities, story) => ({
                  ...entities,
                  [story.id]: story,
                }),
                {},
              ),
            }
          : { ids: [], entities: {} },
    }),
    {},
  );

  return {
    props: {
      initialState: {
        days: {
          date,
          day: date === todayDate ? '今' : getDayFromDate(date),
        },
        stories: {
          topStories,
          ...stories,
        },
      },
    },
  };
};

export { getStaticPaths, getStaticProps };

export default Date;
