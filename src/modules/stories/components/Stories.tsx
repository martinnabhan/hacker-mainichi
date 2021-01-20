import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDate } from '../../days';
import { Story } from './Story';
import { fetchStories, selectIds, selectStatus } from '../state';
import { Error, Loading } from '../../../app';

const Stories = () => {
  const dispatch = useDispatch();
  const date = useSelector(selectDate);
  const storyIds = useSelector(selectIds({ date }));
  const status = useSelector(selectStatus({ date }));

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStories({ date }));
    }
  }, [date]);

  if (status === 'pending') {
    return <Loading />;
  }

  if (status === 'rejected') {
    return <Error />;
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
