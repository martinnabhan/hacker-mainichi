import { selectById, selectVisited } from '@hacker-mainichi/state/stories';
import { State } from '@hacker-mainichi/state/reducer';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { visitStory } from '@hacker-mainichi/thunks/visitStory';
import { useDispatch } from '@hacker-mainichi/hooks/useDispatch';

interface Props {
  date: string;
  id: Story['id'];
}

const Story: FunctionComponent<Props> = ({ date, id }) => {
  const dispatch = useDispatch();
  const story = useSelector((state: State) => selectById(date)(state, id));
  const visited = useSelector(selectVisited(date, id));

  if (!story) {
    return null;
  }

  const { comments, score, title } = story;

  return (
    <a
      href={`https://news.ycombinator.com/item?id=${id}`}
      onClick={() => dispatch(visitStory({ date, id }))}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div
        className={`${visited ? 'opacity-60 dark:opacity-40' : 'shadow-sm'
          } p-4 mb-4 rounded-md bg-white dark:bg-secondary-dark border border-border-color dark:border-border-color-dark`}
      >
        <p className="font-bold text-title dark:text-title-dark">{title}</p>

        <div className="text-sm text-subtitle dark:text-subtitle-dark">
          <span>{score} ポイント・</span>
          <span>{comments} コメント</span>
        </div>
      </div>
    </a>
  );
};

export { Story };
