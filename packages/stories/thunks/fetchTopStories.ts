import { today } from '@hacker-mainichi/client/lib';
import { fetchVisitedStories } from '@hacker-mainichi/stories/thunks/fetchVisitedStories';
import { createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'https://hacker-news.firebaseio.com/v0';

const fetchTopStories = createAsyncThunk(
  'stories/fetchTopStories',
  async ({ user }: { user: boolean }, { dispatch }) => {
    const response = await fetch(`${baseUrl}/topstories.json`);
    const topStoryIds: number[] = await response.json();

    const responses = await Promise.all(topStoryIds.slice(0, 100).map(id => fetch(`${baseUrl}/item/${id}.json`)));
    const apiStories: (ApiStory | null)[] = await Promise.all(
      responses.map(apiStoryResponse => apiStoryResponse.json()),
    );

    const stories = apiStories
      .filter((apiStory): apiStory is ApiStory => apiStory !== null && apiStory.type === 'story')
      .map(({ descendants, id, score, title }) => ({
        comments: descendants,
        id,
        score,
        title,
      }));

    if (user) {
      dispatch(fetchVisitedStories({ date: today }));
    }

    return { stories };
  },
);

export { fetchTopStories };
