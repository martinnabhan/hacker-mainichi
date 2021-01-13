import { createEntityAdapter, createSlice, EntityId, PayloadAction } from '@reduxjs/toolkit';
import { State } from '../../app/reducer';

export interface Story {
  id: EntityId;
  by: string;
  commentCount: number;
  score: number;
  time: number;
  title: string;
  visited: boolean;
}

const storiesAdapter = createEntityAdapter<Story>();

const { actions, reducer } = createSlice({
  name: 'stories',
  initialState: {
    status: {
      loading: false,
      error: null,
    },
    stories: storiesAdapter.getInitialState(),
  },
  reducers: {
    storiesReceived: (state, { payload }: PayloadAction<{ stories: Story[] }>) => {
      storiesAdapter.upsertMany(state.stories, payload.stories);
      state.status.loading = false;
    },
    storiesRequested: state => {
      state.status.loading = true;
    },
    storyVisited: (state, { payload }: PayloadAction<{ id: Story['id'] }>) => {
      storiesAdapter.updateOne(state.stories, { id: payload.id, changes: { visited: true } });
      localStorage.setItem(payload.id.toString(), payload.id.toString());
    },
  },
});

const { storiesReceived, storiesRequested, storyVisited } = actions;

const { selectById, selectIds } = storiesAdapter.getSelectors((state: State) => state.stories.stories);

const selectStatus = (state: State) => state.stories.status;

export { storiesReceived, storiesRequested, storyVisited, reducer, selectById, selectIds, selectStatus };
