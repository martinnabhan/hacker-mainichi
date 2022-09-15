import { reducer as stories } from '@hacker-mainichi/client/state/stories';
import { combineReducers } from '@reduxjs/toolkit';

const reducer = combineReducers({
  stories,
});

export type State = ReturnType<typeof reducer>;

export { reducer };
