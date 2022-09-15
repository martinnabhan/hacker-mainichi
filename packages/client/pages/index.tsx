import { Error } from '@hacker-mainichi/client/components/Error';
import { Loading } from '@hacker-mainichi/client/components/Loading';
import { Stories } from '@hacker-mainichi/client/components/Stories';
import { useDispatch } from '@hacker-mainichi/client/hooks/useDispatch';
import { today } from '@hacker-mainichi/client/lib/today';
import { selectStatus } from '@hacker-mainichi/client/state/stories';
import { fetchTopStories } from '@hacker-mainichi/client/thunks/fetchTopStories';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

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
