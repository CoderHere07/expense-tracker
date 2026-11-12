import { createSlice, nanoid } from '@reduxjs/toolkit';
import { generateExpenses } from '../data/dummyExpenses';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: { items: generateExpenses(55), owner: null },
  reducers: {
    loadExpenses(state, action) {
      state.owner = action.payload.owner;
      state.items = action.payload.items;
    },
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

export const { loadExpenses, addExpense, deleteExpense } = expenseSlice.actions;
export default expenseSlice.reducer;