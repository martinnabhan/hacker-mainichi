import { reducer as auth } from '@hacker-mainichi/auth/state';
import { reducer as stories } from '@hacker-mainichi/stories/state';
import { combineReducers } from '@reduxjs/toolkit';

const reducer = combineReducers({
  auth,
  stories,
});

export type State = ReturnType<typeof reducer>;

export { reducer };
