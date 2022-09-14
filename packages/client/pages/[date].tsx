import { Stories } from '@hacker-mainichi/client/components/Stories';
import { dates } from '@hacker-mainichi/client/lib/dates';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { fetchStories } from '@hacker-mainichi/client/lib/fetchStories';
import { useSelector } from 'react-redux';
import { selectStatus, selectVisitedStatus, storiesReceived } from '@hacker-mainichi/client/state/stories';
import { fetchVisitedStories } from '@hacker-mainichi/client/thunks/fetchVisitedStories';
import { useDispatch } from '@hacker-mainichi/client/hooks/useDispatch';
import { useEffect } from 'react';

const Date: NextPage<PageProps> = ({ date, stories }) => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus(date));
  const visitedStatus = useSelector(selectVisitedStatus(date));

  if (status === 'idle') {
    dispatch(storiesReceived({ date, stories }));
  }

  useEffect(() => {
    if (visitedStatus === 'idle' || visitedStatus === 'rejected') {
      // TODO: if user is logged in
      dispatch(fetchVisitedStories({ date }));
    }
  }, [date, dispatch, visitedStatus]);

  return <Stories date={date} />;
};

const getStaticPaths: GetStaticPaths<{ date: string }> = async () => ({
  paths: dates.map(date => ({ params: { date } })),
  fallback: false,
});

const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => ({
  props: {
    date: params?.date as string,
    stories: await fetchStories(params?.date as string),
  },
});

export { getStaticPaths, getStaticProps };

export default Date;
