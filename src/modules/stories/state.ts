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
import { format, subDays } from 'date-fns';
import { State } from '../../app/reducer';
import { days, todayDate } from '../days';

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

const today = new Date();
const dates = [...Array(days.length + 1).keys()].map(daysAgo => format(subDays(today, daysAgo), 'yyyyMMdd'));

const adapters: { [key: string]: EntityAdapter<Story> } = dates.reduce(
  (adapters, date) => ({ ...adapters, [date]: createEntityAdapter<Story>() }),
  {},
);

const stories: { [key: string]: EntityState<Story> } = Object.entries(adapters).reduce(
  (stories, [date, adapter]) => ({ ...stories, [date]: adapter.getInitialState() }),
  {},
);

const initialState: {
  [key: string]: { error: SerializedError; status: RequestStatus; stories: typeof stories[string] };
} = dates.reduce(
  (dates, date) => ({
    ...dates,
    [date]: {
      error: null,
      status: 'idle',
      stories: stories[date],
    },
  }),
  {},
);

const baseUrl = 'https://hacker-news.firebaseio.com/v0';

const isVisited = (id: EntityId) => Boolean(localStorage.getItem(id.toString()));

const fetchStories = createAsyncThunk('stories/fetchStories', async ({ date }: { date: string }) => {
  let stories: Story[] = [];

  if (date === todayDate) {
    const response = await fetch(`${baseUrl}/topstories.json`);
    const topStoryIds: number[] = await response.json();

    const responses = await Promise.all(topStoryIds.slice(0, 100).map(id => fetch(`${baseUrl}/item/${id}.json`)));
    const apiStories: (APIStory | null)[] = await Promise.all(responses.map(response => response.json()));

    stories = apiStories
      .filter(apiStory => apiStory && apiStory.type === 'story')
      .map(({ id, by, descendants, score, title }) => ({
        id,
        by,
        comments: descendants,
        score,
        title,
        visited: isVisited(id),
      }));
  } else {
    const response = await fetch(
      `${process.env.NODE_ENV === 'development' ? 'http://localhost:4568/hacker-mainichi' : ''}/stories/${date}.json`,
    );

    if (response.status === 404) {
      throw new Error('404');
    }

    const dbStories: DBStory[] = await response.json();

    stories = dbStories.map(dbStory => ({ ...dbStory, visited: isVisited(dbStory.id) }));
  }

  return { date, stories };
});

const { actions, reducer } = createSlice({
  extraReducers: builder => {
    builder.addCase(fetchStories.fulfilled, (state, { meta, payload }) => {
      adapters[payload.date].setAll(state[payload.date].stories, payload.stories);
      state[payload.date].status = meta.requestStatus;
    });

    builder.addCase(fetchStories.pending, (state, { meta }) => {
      state[meta.arg.date].error = null;
      state[meta.arg.date].status = meta.requestStatus;
    });

    builder.addCase(fetchStories.rejected, (state, { error, meta }) => {
      state[meta.arg.date].error = error;
      state[meta.arg.date].status = meta.requestStatus;
    });
  },
  initialState,
  name: 'stories',
  reducers: {
    storyVisited: (state, { payload }: PayloadAction<{ date: string; id: Story['id'] }>) => {
      adapters[payload.date].updateOne(state[payload.date].stories, { id: payload.id, changes: { visited: true } });
      localStorage.setItem(payload.id.toString(), payload.id.toString());
    },
  },
});

const { storyVisited } = actions;

const selectById = ({ date }: { date: string }) =>
  adapters[date].getSelectors((state: State) => state.stories[date].stories).selectById;

const selectError = ({ date }: { date: string }) => (state: State) => state.stories[date].error;

const selectIds = ({ date }: { date: string }) =>
  adapters[date].getSelectors((state: State) => state.stories[date].stories).selectIds;

const selectStatus = ({ date }: { date: string }) => (state: State) => state.stories[date].status;

export { fetchStories, storyVisited, reducer, selectById, selectError, selectIds, selectStatus };
