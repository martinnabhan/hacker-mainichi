import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '@hacker-mainichi/state/reducer';

const store = configureStore({ reducer });

export { store };
