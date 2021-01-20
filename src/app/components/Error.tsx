import { useSelector } from 'react-redux';
import { selectDate } from '../../modules/days';
import { selectError } from '../../modules/stories/state';

const Error = () => {
  const date = useSelector(selectDate);
  const error = useSelector(selectError({ date }));

  if (error && error.message === '404') {
    return (
      <div className="flex justify-center items-center h-full flex-col">
        <p className="text-title text-9xl -mt-24 sm:-mt-16">404</p>
      </div>
    );
  }

  return <p>エラーが発生しました。</p>;
};

export { Error };
