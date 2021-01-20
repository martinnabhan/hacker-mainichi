import { combineReducers } from '@reduxjs/toolkit';
import { reducer as days } from '../modules/days';
import { reducer as stories } from '../modules/stories';

const reducer = combineReducers({
  days,
  stories,
});

export type State = ReturnType<typeof reducer>;

export { reducer };
