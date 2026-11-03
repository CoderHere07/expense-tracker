import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenseSlice.js';

export const createStore = preloadedState =>
  configureStore({
    reducer: { expenses: expenseReducer },
    preloadedState,
  });

export const store = createStore();