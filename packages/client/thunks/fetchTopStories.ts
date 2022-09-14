import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchVisitedStories } from '@hacker-mainichi/thunks/fetchVisitedStories';
import { today } from '@hacker-mainichi/lib/today';

const baseUrl = 'https://hacker-news.firebaseio.com/v0';

interface ApiStory extends Omit<Story, 'comments'> {
  descendants: number;
  type: string;
}

const fetchTopStories = createAsyncThunk('stories/fetchTopStories', async (_, { dispatch }) => {
  const response = await fetch(`${baseUrl}/topstories.json`);
  const topStoryIds: number[] = await response.json();

  const responses = await Promise.all(topStoryIds.slice(0, 100).map(id => fetch(`${baseUrl}/item/${id}.json`)));
  const apiStories: (ApiStory | null)[] = await Promise.all(responses.map(response => response.json()));

  const stories = apiStories
    .filter((apiStory): apiStory is ApiStory => apiStory !== null && apiStory.type === 'story')
    .map(({ id, descendants, score, title }) => ({
      id,
      comments: descendants,
      score,
      title,
    }));

  // TODO: if user is logged in
  dispatch(fetchVisitedStories({ date: today }));

  return { stories };
});

export { fetchTopStories };
