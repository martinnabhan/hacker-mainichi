import { combineReducers } from '@reduxjs/toolkit';
import { reducer as stories } from '../modules/stories';

const reducer = combineReducers({
  stories,
});

export type State = ReturnType<typeof reducer>;

export { reducer };
