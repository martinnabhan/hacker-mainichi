import { FunctionComponent } from 'react';
import { Story } from '@hacker-mainichi/components/Story';
import { FullScreenMessage } from '@hacker-mainichi/components/FullScreenMessage';

interface Props {
  stories: Story[];
}

const Stories: FunctionComponent<Props> = ({ stories }) => {
  if (stories.length === 0) {
    return <FullScreenMessage message="ストーリーがありません。" />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {stories.map(story => (
        <Story key={story.id} {...story} />
      ))}
    </div>
  );
};

export { Stories };
