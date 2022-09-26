import { reducer } from '@hacker-mainichi/state/reducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({ reducer });

export { store };
