import { EntityId } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { storiesRequested, selectIds, selectStatus, storiesReceived } from '../state';

interface APIStory {
  id: EntityId;
  by: string;
  dead?: boolean;
  descendants: number;
  score: number;
  time: number;
  title: string;
  type: 'story';
  url: string;
}

const useStoriesAPI = () => {
  const dispatch = useDispatch();
  const storyIds = useSelector(selectIds);
  const { error, loading } = useSelector(selectStatus);

  const getStories = async () => {
    dispatch(storiesRequested());

    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    const topStoryIds: number[] = await response.json();

    const responses = await Promise.all(
      topStoryIds.slice(0, 100).map(id => fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)),
    );
    const apiStories: APIStory[] = await Promise.all(responses.map(response => response.json()));

    const stories = apiStories
      .filter(({ type }) => type === 'story')
      .map(({ id, by, descendants, score, time, title }) => ({
        id,
        by,
        commentCount: descendants,
        score,
        time,
        title,
        visited: Boolean(localStorage.getItem(id.toString())),
      }));

    dispatch(storiesReceived({ stories }));
  };

  return {
    error,
    loading,
    storyIds,
    getStories,
  };
};

export { useStoriesAPI };
