import { createSlice, nanoid } from '@reduxjs/toolkit';
import { generateExpenses } from '../data/dummyExpenses.js';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: { items: generateExpenses(55) },
  reducers: {
    addExpense: {
      reducer(state, action) {
        state.items.unshift(action.payload);
      },
      prepare(expense) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString().slice(0, 10),
            ...expense,
          },
        };
      },
    },
    deleteExpense(state, action) {
      state.items = state.items.filter(e => e.id !== action.payload);
    },
  },
});

export const { addExpense, deleteExpense } = expenseSlice.actions;
export default expenseSlice.reducer;