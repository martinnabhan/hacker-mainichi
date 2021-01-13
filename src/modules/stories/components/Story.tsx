import { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../app/reducer';
import { selectById, Story as StoryInterface, storyVisited } from '../state';

interface Props {
  id: StoryInterface['id'];
}

const pluralise = (word: string, count: number) => `${word}${count === 1 ? '' : 's'}`;

const Story: FunctionComponent<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const { commentCount, score, title, visited } = useSelector((state: State) => selectById(state, id));

  const comments = `${commentCount} ${pluralise('comment', commentCount)}`;
  const points = `${score} ${pluralise('point', score)}`;
  const url = `https://news.ycombinator.com/item?id=${id}`;

  const handleClick = () => !visited && dispatch(storyVisited({ id }));

  return (
    <a href={url} onClick={handleClick} target="_blank">
      <div className={`${visited ? 'opacity-60' : 'shadow-sm'} p-4 mb-4 rounded-md bg-white border border-borderColor`}>
        <p className="font-bold text-title">{title}</p>

        <div className="text-sm text-subtitle">
          <span>{points} · </span>
          <span>{comments}</span>
        </div>
      </div>
    </a>
  );
};

export { Story };
