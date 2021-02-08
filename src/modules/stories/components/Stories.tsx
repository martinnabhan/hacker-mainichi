import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDate, todayDate } from '../../days';
import { Story } from './Story';
import { selectIds, selectStatus } from '../state';
import { FullScreenMessage, Loading } from '../../../app';
import { fetchTopStories } from '../api';

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
    return <FullScreenMessage message="エラーが発生しました。" />;
  }

  if ((date !== todayDate || status === 'fulfilled') && storyIds.length === 0) {
    return <FullScreenMessage message="ストーリーがありません。" />;
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
