import { configureStore } from '@reduxjs/toolkit';
import expenseReducer from './expenseSlice';
import { saveForUser } from './persistence';

export const createStore = preloadedState =>
  configureStore({
    reducer: { expenses: expenseReducer },
    preloadedState,
  });

export const store = createStore();

store.subscribe(() => {
  const { owner, items } = store.getState().expenses;
  if (owner) saveForUser(owner, items);
});