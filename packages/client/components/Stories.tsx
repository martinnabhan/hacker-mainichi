import { Story } from '@hacker-mainichi/client/components/Story';
import { FullScreenMessage } from '@hacker-mainichi/client/components/FullScreenMessage';
import { useSelector } from 'react-redux';
import { selectIds } from '@hacker-mainichi/client/state/stories';
import { FunctionComponent } from 'react';

interface Props {
  date: string;
}

const Stories: FunctionComponent<Props> = ({ date }) => {
  const storyIds = useSelector(selectIds(date));

  if (storyIds.length === 0) {
    return <FullScreenMessage message="ストーリーがありません。" />;
  }

  return (
    <div className="mx-auto max-w-4xl">
      {storyIds.map(id => (
        <Story key={id} date={date} id={Number(id)} />
      ))}
    </div>
  );
};

export { Stories };
