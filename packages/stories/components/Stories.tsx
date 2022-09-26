import { FullScreenMessage } from '@hacker-mainichi/components';
import { Story } from '@hacker-mainichi/stories/components/Story';
import { selectIds } from '@hacker-mainichi/stories/state';
import { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';

interface Props {
  date: string;
}

const Stories: FunctionComponent<Props> = ({ date }) => {
  const storyIds = useSelector(selectIds(date));

  if (storyIds.length === 0) {
    return <FullScreenMessage message="ストーリーがありません。" />;
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4">
      {storyIds.map(id => (
        <Story key={id} date={date} id={Number(id)} />
      ))}
    </div>
  );
};

export { Stories };
