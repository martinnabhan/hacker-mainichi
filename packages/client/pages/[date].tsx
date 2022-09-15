import { Stories } from '@hacker-mainichi/client/components/Stories';
import { useDispatch } from '@hacker-mainichi/client/hooks/useDispatch';
import { dates } from '@hacker-mainichi/client/lib/dates';
import { fetchStories } from '@hacker-mainichi/client/lib/fetchStories';
import { selectStatus, selectVisitedStatus, storiesReceived } from '@hacker-mainichi/client/state/stories';
import { fetchVisitedStories } from '@hacker-mainichi/client/thunks/fetchVisitedStories';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

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
  fallback: false,
  paths: dates.map(date => ({ params: { date } })),
});

const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => ({
  props: {
    date: params?.date as string,
    stories: await fetchStories(params?.date as string),
  },
});

export { getStaticPaths, getStaticProps };

export default Date;
