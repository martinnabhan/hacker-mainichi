import { useEffect } from 'react';
import { useStoriesAPI } from '../hooks/useStoriesAPI';
import { Story } from './Story';

const Stories = () => {
  const { error, loading, storyIds, getStories } = useStoriesAPI();

  useEffect(() => {
    getStories();
  }, []);

  if (error) {
    return <p>エラー: {error.message}</p>;
  }

  if (loading) {
    return <p>読み込み中...</p>;
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
