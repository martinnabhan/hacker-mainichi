import { combineReducers } from '@reduxjs/toolkit';
import { reducer as stories } from '@hacker-mainichi/state/stories';

const reducer = combineReducers({
  stories,
});

export type State = ReturnType<typeof reducer>;

export { reducer };