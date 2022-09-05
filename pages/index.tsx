import { Stories } from '@hacker-mainichi/components/Stories';
import { today } from '@hacker-mainichi/lib/today';
import { selectStatus } from '@hacker-mainichi/state/stories';
import { useSelector } from 'react-redux';
import { fetchTopStories } from '@hacker-mainichi/thunks/fetchTopStories';
import { useEffect } from 'react';
import { Loading } from '@hacker-mainichi/components/Loading';
import { Error } from '@hacker-mainichi/components/Error';
import { useDispatch } from '@hacker-mainichi/hooks/useDispatch';

const Index = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus(today));

  useEffect(() => {
    if (status !== 'fulfilled') {
      dispatch(fetchTopStories());
    }
  }, [dispatch, status]);

  if (status === 'idle') {
    return null;
  }

  if (status === 'pending') {
    return <Loading />;
  }

  if (status === 'rejected') {
    return <Error />;
  }

  return <Stories date={today} />;
};

export default Index;
