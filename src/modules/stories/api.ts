import { createAsyncThunk } from '@reduxjs/toolkit';
import { todayDate } from '../days';
import { BaseStory } from './state';

interface APIStory extends BaseStory {
  descendants: number;
  type: 'story';
}

const baseUrl = 'https://hacker-news.firebaseio.com/v0';

const fetchTopStories = createAsyncThunk('stories/fetchTopStories', async () => {
  const response = await fetch(`${baseUrl}/topstories.json`);
  const topStoryIds: number[] = await response.json();

  const responses = await Promise.all(topStoryIds.slice(0, 100).map(id => fetch(`${baseUrl}/item/${id}.json`)));
  const apiStories: (APIStory | null)[] = await Promise.all(responses.map(response => response.json()));

  const stories = apiStories
    .filter((apiStory): apiStory is APIStory => apiStory !== null && apiStory.type === 'story')
    .map(({ id, by, descendants, score, title }) => ({
      id,
      by,
      comments: descendants,
      score,
      title,
    }));

  return { date: todayDate, stories };
});

export { fetchTopStories };
