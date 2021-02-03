import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../app/reducer';
import { selectDate } from '../../days';
import { selectById, Story as IStory, storyVisited } from '../state';

interface Props {
  id: IStory['id'];
}

const Story: FunctionComponent<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const date = useSelector(selectDate);
  const story = useSelector((state: State) => selectById({ date })(state, id));

  if (!story) {
    return null;
  }

  const { comments, score, title, visited } = story;

  const handleClick = () => !visited && dispatch(storyVisited({ date, id }));

  return (
    <a href={`https://news.ycombinator.com/item?id=${id}`} onClick={handleClick} target="_blank">
      <div className={`${visited ? 'opacity-60' : 'shadow-sm'} p-4 mb-4 rounded-md bg-white border border-borderColor`}>
        <p className="font-bold text-title">{title}</p>

        <div className="text-sm text-subtitle">
          <span>{score} ポイント・</span>
          <span>{comments} コメント</span>
        </div>
      </div>
    </a>
  );
};

export { Story };
