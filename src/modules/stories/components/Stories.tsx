import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDate, todayDate } from '../../days';
import { Story } from './Story';
import { fetchTopStories, selectIds, selectStatus } from '../state';
import { Error, Loading } from '../../../app';
import NotFound from '../../../pages/404';

const Stories = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectDate);
  const status = useSelector(selectStatus);
  const storyIds = useSelector(selectIds({ date }));

  useEffect(() => {
    if (date === todayDate && status === 'idle') {
      dispatch(fetchTopStories());
    }
  }, []);

  if (status === 'pending') {
    return <Loading />;
  }

  if (status === 'rejected') {
    return <Error />;
  }

  if ((date !== todayDate || status === 'fulfilled') && storyIds.length === 0) {
    return <NotFound message="ストーリーがありません。" />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {storyIds.map(id => (
        <Story key={id} id={id} />
      ))}
    </div>
  );
};

export { Stories };
