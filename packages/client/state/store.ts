import { reducer } from '@hacker-mainichi/client/state/reducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({ reducer });

export { store };
