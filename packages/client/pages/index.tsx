import { useUser } from '@hacker-mainichi/auth/hooks';
import { today } from '@hacker-mainichi/client/lib/today';
import { Error, Loading } from '@hacker-mainichi/components';
import { useDispatch } from '@hacker-mainichi/state/hooks';
import { Stories } from '@hacker-mainichi/stories/components';
import { selectStatus } from '@hacker-mainichi/stories/state';
import { fetchTopStories } from '@hacker-mainichi/stories/thunks/fetchTopStories';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Index = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus(today));
  const user = useUser();

  useEffect(() => {
    if (status !== 'fulfilled') {
      dispatch(fetchTopStories({ user }));
    }
  }, [dispatch, status, user]);

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
