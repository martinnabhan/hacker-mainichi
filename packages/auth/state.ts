/* eslint-disable no-param-reassign */
import type { State } from '@hacker-mainichi/state/types';
import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  initialState: {
    signInDialogOpen: false,
  },
  name: 'auth',
  reducers: {
    signInDialogClosed: state => {
      state.signInDialogOpen = false;
    },
    signInDialogOpened: state => {
      state.signInDialogOpen = true;
    },
  },
});

const { signInDialogClosed, signInDialogOpened } = actions;

const selectSignInDialogOpen = (state: State) => state.auth.signInDialogOpen;

export { reducer, selectSignInDialogOpen, signInDialogClosed, signInDialogOpened };
