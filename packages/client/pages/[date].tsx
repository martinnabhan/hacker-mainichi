import { useUser } from '@hacker-mainichi/auth/hooks';
import { dates } from '@hacker-mainichi/client/lib/dates';
import { useDispatch } from '@hacker-mainichi/state/hooks';
import { Stories } from '@hacker-mainichi/stories/components';
import { fetchStories } from '@hacker-mainichi/stories/lib';
import { selectStatus, selectVisitedStatus, storiesReceived } from '@hacker-mainichi/stories/state';
import { fetchVisitedStories } from '@hacker-mainichi/stories/thunks/fetchVisitedStories';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ComponentProps, useEffect } from 'react';
import { useSelector } from 'react-redux';

interface Props {
  date: string;
  stories: Story[];
}

const Date: NextPage<Props> = ({ date, stories }) => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus(date));
  const visitedStatus = useSelector(selectVisitedStatus(date));
  const user = useUser();

  if (status === 'idle') {
    dispatch(storiesReceived({ date, stories }));
  }

  useEffect(() => {
    if (user && (visitedStatus === 'idle' || visitedStatus === 'rejected')) {
      dispatch(fetchVisitedStories({ date }));
    }
  }, [date, dispatch, user, visitedStatus]);

  return <Stories date={date} />;
};

const getStaticPaths: GetStaticPaths<{ date: string }> = async () => ({
  fallback: false,
  paths: dates.map(date => ({ params: { date } })),
});

const getStaticProps: GetStaticProps<ComponentProps<typeof Date>> = async ({ params }) => ({
  props: {
    date: params?.date as string,
    stories: await fetchStories(params?.date as string),
  },
});

export { getStaticPaths, getStaticProps };

export default Date;
