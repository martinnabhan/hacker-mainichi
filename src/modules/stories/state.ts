import {
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
import { fetchTopStories } from './api';

export interface BaseStory {
  id: EntityId;
  by: string;
  score: number;
  title: string;
}

export interface Story extends BaseStory {
  comments: number;
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
    storyVisited: (_, { payload }: PayloadAction<{ date: string; id: Story['id'] }>) => {
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

export { initialState, storyVisited, reducer, selectById, selectError, selectIds, selectStatus, topStories };
