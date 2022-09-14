import { Stories } from '@hacker-mainichi/client/components/Stories';
import { today } from '@hacker-mainichi/client/lib/today';
import { selectStatus } from '@hacker-mainichi/client/state/stories';
import { useSelector } from 'react-redux';
import { fetchTopStories } from '@hacker-mainichi/client/thunks/fetchTopStories';
import { useEffect } from 'react';
import { Loading } from '@hacker-mainichi/client/components/Loading';
import { Error } from '@hacker-mainichi/client/components/Error';
import { useDispatch } from '@hacker-mainichi/client/hooks/useDispatch';

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
