import { createStore } from '../store/store';
import { addExpense, deleteExpense, loadExpenses } from '../store/expenseSlice';
import { generateExpenses } from '../data/dummyExpenses';

test('seed data contains 50+ expenses', () => {
  expect(generateExpenses(55).length).toBeGreaterThanOrEqual(50);
  expect(createStore().getState().expenses.items.length).toBeGreaterThanOrEqual(50);
});

test('addExpense puts the new expense at the top', () => {
  const store = createStore({ expenses: { items: [], owner: null } });
  store.dispatch(addExpense({ title: 'Tea', amount: 50, category: 'Food' }));
  const { items } = store.getState().expenses;
  expect(items).toHaveLength(1);
  expect(items[0].title).toBe('Tea');
  expect(items[0].id).toBeDefined();
});

test('deleteExpense removes an expense by id', () => {
  const store = createStore({
    expenses: {
      items: [{ id: 'a', title: 'A', amount: 1, category: 'Food', date: '2026-01-01' }],
      owner: null,
    },
  });
  store.dispatch(deleteExpense('a'));
  expect(store.getState().expenses.items).toHaveLength(0);
});

test('loadExpenses sets the owner and their expenses', () => {
  const store = createStore();
  store.dispatch(loadExpenses({ owner: 'a@test.com', items: [] }));
  expect(store.getState().expenses.owner).toBe('a@test.com');
  expect(store.getState().expenses.items).toHaveLength(0);
});