import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useExpenses } from '../hooks/useExpenses.js';
import { filterReducer, initialFilter } from '../hooks/filterReducer.js';
import { createStore } from '../store/store.js';

test('filterReducer Sets and Resets Category', () => {
  const next = filterReducer(initialFilter, { type: 'SET_CATEGORY', payload: 'Food' });
  expect(next.category).toBe('Food');
  expect(filterReducer(next, { type: 'RESET' })).toEqual(initialFilter);
});

test('useExpenses filter find total base on filter', () => {
  const store = createStore({
    expenses: {
      items: [
        { id: '1', title: 'Lunch', amount: 100, category: 'Food', date: '2026-01-01' },
        { id: '2', title: 'Taxi', amount: 300, category: 'Transport', date: '2026-01-01' },
      ],
    },
  });
  const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  const { result } = renderHook(() => useExpenses(), { wrapper });

  expect(result.current.total).toBe(400);

  act(() => result.current.setCategory('Food'));
  expect(result.current.total).toBe(100);
  expect(result.current.expenses).toHaveLength(1);
});