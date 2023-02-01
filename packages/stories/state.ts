/* eslint-disable no-param-reassign */
import { dates, today } from '@hacker-mainichi/client/lib';
import type { State } from '@hacker-mainichi/state/types';
import { fetchTopStories } from '@hacker-mainichi/stories/thunks/fetchTopStories';
import { fetchVisitedStories } from '@hacker-mainichi/stories/thunks/fetchVisitedStories';
import { visitStory } from '@hacker-mainichi/stories/thunks/visitStory';
import { EntityAdapter, EntityState, PayloadAction, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

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

const selectVisited = (storyDate: string, id: number) => (state: State) => {
  const storyDateAndEarlierDates = [today, ...dates].filter(date => date <= storyDate);

  for (const date of storyDateAndEarlierDates) {
    if (state.stories[date].visited.ids[id]) {
      return true;
    }
  }

  return false;
};

const selectVisitedStatus = (date: string) => (state: State) => state.stories[date].visited.status;

export {
  reducer,
  selectById,
  selectIds,
  selectStatus,
  selectVisited,
  selectVisitedStatus,
  storiesReceived,
  visitedStoriesReceived,
};
