import { createStore } from '../store/store.js';
import { addExpense, deleteExpense } from '../store/expenseSlice.js';
import { generateExpenses } from '../data/dummyExpenses.js';

test('seed data contain 50+ expenses', () => {
  expect(generateExpenses(55).length).toBeGreaterThanOrEqual(50);
  expect(createStore().getState().expenses.items.length).toBeGreaterThanOrEqual(50);
});

test('addExpense adds a new expense to the top', () => {
  const store = createStore({ expenses: { items: [] } });
  store.dispatch(addExpense({ title: 'Tea', amount: 50, category: 'Food' }));
  const { items } = store.getState().expenses;
  expect(items).toHaveLength(1);
  expect(items[0].title).toBe('Tea');
  expect(items[0].id).toBeDefined();
});

test('deleteExpense removes the expense with the given id', () => {
  const store = createStore({
    expenses: { items: [{ id: 'a', title: 'A', amount: 1, category: 'Food', date: '2026-01-01' }] },
  });
  store.dispatch(deleteExpense('a'));
  expect(store.getState().expenses.items).toHaveLength(0);
});