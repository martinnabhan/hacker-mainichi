import { configureStore } from '@reduxjs/toolkit';
import { reducer, State } from './reducer';

const createStore = (preloadedState: State) => configureStore({ reducer, preloadedState });

export { createStore };
