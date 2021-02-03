import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityAdapter,
  EntityId,
  EntityState,
  PayloadAction,
  SerializedError,
} from '@reduxjs/toolkit';
import { State } from '../../app/reducer';
import { dates, todayDate } from '../days';

interface BaseStory {
  id: EntityId;
  by: string;
  score: number;
  title: string;
}

interface APIStory extends BaseStory {
  descendants: number;
  type: 'story';
}

interface DBStory extends BaseStory {
  comments: number;
}

export interface Story extends DBStory {
  visited: boolean;
}

type RequestStatus = 'fulfilled' | 'idle' | 'pending' | 'rejected';

const topStoriesAdapter = createEntityAdapter<Story>();

const dateAdapters: { [key: string]: EntityAdapter<Story> } = dates.reduce(
  (adapters, date) => ({ ...adapters, [date]: createEntityAdapter<Story>() }),
  {},
);

const stories: { [key: string]: EntityState<Story> } = Object.entries(dateAdapters).reduce(
  (stories, [date, adapter]) => ({ ...stories, [date]: adapter.getInitialState() }),
  {},
);

const topStories = {
  error: null as SerializedError | null,
  status: 'idle' as RequestStatus,
  ...topStoriesAdapter.getInitialState(),
};

const initialState: { [key: string]: typeof stories[string] } & { topStories: typeof topStories } = {
  topStories,
  ...dates.reduce(
    (dates, date) => ({
      ...dates,
      [date]: stories[date],
    }),
    {},
  ),
};

const baseUrl = 'https://hacker-news.firebaseio.com/v0';

const isVisited = (id: EntityId) => Boolean(localStorage.getItem(id.toString()));

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
      visited: isVisited(id),
    }));

  return { date: todayDate, stories };
});

const { actions, reducer } = createSlice({
  extraReducers: builder => {
    builder.addCase(fetchTopStories.fulfilled, (state, { meta, payload }) => {
      topStoriesAdapter.setAll(state.topStories, payload.stories);
      state.topStories.status = meta.requestStatus;
    });

    builder.addCase(fetchTopStories.pending, (state, { meta }) => {
      state.topStories.error = null;
      state.topStories.status = meta.requestStatus;
    });

    builder.addCase(fetchTopStories.rejected, (state, { error, meta }) => {
      state.topStories.error = error;
      state.topStories.status = meta.requestStatus;
    });
  },
  initialState,
  name: 'stories',
  reducers: {
    storyVisited: (state, { payload }: PayloadAction<{ date: string; id: Story['id'] }>) => {
      if (payload.date === todayDate) {
        topStoriesAdapter.updateOne(state.topStories, { id: payload.id, changes: { visited: true } });
      } else {
        dateAdapters[payload.date].updateOne(state[payload.date], { id: payload.id, changes: { visited: true } });
      }

      localStorage.setItem(payload.id.toString(), payload.id.toString());
    },
  },
});

const { storyVisited } = actions;

const selectById = ({ date }: { date: string }) => {
  if (date === todayDate) {
    return topStoriesAdapter.getSelectors((state: State) => state.stories.topStories).selectById;
  } else {
    return dateAdapters[date].getSelectors((state: State) => state.stories[date]).selectById;
  }
};

const selectError = (state: State) => state.stories.topStories.error;

const selectIds = ({ date }: { date: string }) => {
  if (date === todayDate) {
    return topStoriesAdapter.getSelectors((state: State) => state.stories.topStories).selectIds;
  } else {
    return dateAdapters[date].getSelectors((state: State) => state.stories[date]).selectIds;
  }
};

const selectStatus = (state: State) => state.stories.topStories.status;

export { fetchTopStories, storyVisited, reducer, selectById, selectError, selectIds, selectStatus, topStories };
