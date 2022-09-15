import { useDispatch } from '@hacker-mainichi/client/hooks/useDispatch';
import { State } from '@hacker-mainichi/client/state/reducer';
import { selectById, selectVisited } from '@hacker-mainichi/client/state/stories';
import { visitStory } from '@hacker-mainichi/client/thunks/visitStory';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

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
        className={`${
          visited ? 'opacity-60 dark:opacity-40' : 'shadow-sm'
        } mb-4 rounded-md border border-border-color bg-white p-4 dark:border-border-color-dark dark:bg-secondary-dark`}
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
