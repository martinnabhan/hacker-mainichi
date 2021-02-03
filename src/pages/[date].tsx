import { GetStaticPaths, GetStaticProps } from 'next';
import { State } from '../app/reducer';
import { dates, getDayFromDate, todayDate } from '../modules/days';
import { Stories, Story, topStories } from '../modules/stories';

const Date = () => <Stories />;

// TODO DynamoDB から取得
const fetchStories = (date: string): Promise<Story[]> => new Promise(resolve => resolve([]));

const getStaticPaths: GetStaticPaths = async () => ({
  paths: dates.map(date => ({ params: { date } })),
  fallback: false,
});

const getStaticProps: GetStaticProps<{ initialState: State }> = async ({ params }) => {
  const { date } = params as { date: string };

  const stories: Omit<State['stories'], 'topStories'> = {};

  for (const date of dates) {
    const dateStories = await fetchStories(date);

    stories[date] = {
      ids: dateStories.map(({ id }) => id),
      entities: dateStories.reduce((entities, story) => ({ ...entities, [story.id]: story }), {}),
    };
  }

  return {
    props: {
      initialState: {
        days: {
          date,
          day: date === todayDate ? '今日' : getDayFromDate(date),
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
