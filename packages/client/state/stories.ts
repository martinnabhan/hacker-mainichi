import { createEntityAdapter, createSlice, EntityAdapter, EntityState, PayloadAction } from '@reduxjs/toolkit';
import { State } from '@hacker-mainichi/client/state/reducer';
import { dates } from '@hacker-mainichi/client/lib/dates';
import { today } from '@hacker-mainichi/client/lib/today';
import { fetchTopStories } from '@hacker-mainichi/client/thunks/fetchTopStories';
import { visitStory } from '@hacker-mainichi/client/thunks/visitStory';
import { fetchVisitedStories } from '@hacker-mainichi/client/thunks/fetchVisitedStories';

const adapters: { [key: string]: EntityAdapter<Story> } = {};

for (const date of [today, ...dates]) {
  adapters[date] = createEntityAdapter<Story>();
}

const initialState: {
  [key: string]: {
    status: Status;
    stories: EntityState<Story>;
    visited: {
      ids: { [key: number]: true | undefined };
      status: Status;
    };
  };
} = {};

for (const date of [today, ...dates]) {
  initialState[date] = {
    status: 'idle',
    stories: adapters[date].getInitialState(),
    visited: {
      ids: {},
      status: 'idle',
    },
  };
}

const { actions, reducer } = createSlice({
  extraReducers: builder =>
    builder
      .addCase(fetchTopStories.fulfilled, (state, { payload }) => {
        state[today].status = 'fulfilled';
        adapters[today].setAll(state[today].stories, payload.stories);
      })
      .addCase(fetchTopStories.pending, state => {
        state[today].status = 'pending';
      })
      .addCase(fetchTopStories.rejected, state => {
        state[today].status = 'rejected';
      })
      .addCase(fetchVisitedStories.fulfilled, (state, { payload }) => {
        state[payload.date].visited.status = 'fulfilled';

        for (const id of payload.ids) {
          state[payload.date].visited.ids[id] = true;
        }
      })
      .addCase(fetchVisitedStories.pending, (state, { meta }) => {
        state[meta.arg.date].visited.status = 'pending';
      })
      .addCase(fetchVisitedStories.rejected, (state, { meta }) => {
        state[meta.arg.date].visited.status = 'rejected';
      })
      .addCase(visitStory.pending, (state, { meta }) => {
        state[meta.arg.date].visited.ids[meta.arg.id] = true;
      })
      .addCase(visitStory.rejected, (state, { meta }) => {
        delete state[meta.arg.date].visited.ids[meta.arg.id];
      }),
  initialState,
  name: 'stories',
  reducers: {
    storiesReceived: (state, { payload }: PayloadAction<{ date: string; stories: Story[] }>) => {
      state[payload.date].status = 'fulfilled';
      adapters[payload.date].setAll(state[payload.date].stories, payload.stories);
    },
    visitedStoriesReceived: (
      state,
      { payload }: PayloadAction<{ visited: { [key: string]: { [key: number]: true } } }>,
    ) => {
      for (const date of Object.keys(payload.visited)) {
        state[date].visited.ids = payload.visited[date];
      }
    },
  },
});

const { storiesReceived, visitedStoriesReceived } = actions;

const selectIds = (date: string) =>
  adapters[date].getSelectors((state: State) => state.stories[date].stories).selectIds;

const selectById = (date: string) =>
  adapters[date].getSelectors((state: State) => state.stories[date].stories).selectById;

const selectStatus = (date: string) => (state: State) => state.stories[date].status;

const selectVisited = (date: string, id: number) => (state: State) => state.stories[date].visited.ids[id];

const selectVisitedStatus = (date: string) => (state: State) => state.stories[date].visited.status;

export {
  initialState,
  reducer,
  selectById,
  selectIds,
  selectStatus,
  selectVisited,
  selectVisitedStatus,
  storiesReceived,
  visitedStoriesReceived,
};
