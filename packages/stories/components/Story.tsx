import { useUser } from '@hacker-mainichi/auth/hooks';
import { useDispatch } from '@hacker-mainichi/state/hooks';
import { State } from '@hacker-mainichi/state/types';
import { selectById, selectVisited } from '@hacker-mainichi/stories/state';
import { visitStory } from '@hacker-mainichi/stories/thunks/visitStory';
import clsx from 'clsx';
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
  const user = useUser();

  if (!story) {
    return null;
  }

  const { comments, score, title } = story;

  return (
    <a
      href={`https://news.ycombinator.com/item?id=${id}`}
      onClick={() => !visited && dispatch(visitStory({ date, id, user }))}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div
        className={clsx(visited ? 'opacity-40' : 'shadow-sm', 'rounded-md border border-[#393a3b] bg-[#242526] p-4')}
      >
        <p className="font-bold">{title}</p>

        <div className="text-sm text-[#9c9ea2]">
          <span>{score} ポイント・</span>
          <span>{comments} コメント</span>
        </div>
      </div>
    </a>
  );
};

export { Story };
