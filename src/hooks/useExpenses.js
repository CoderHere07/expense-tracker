import { useCallback, useMemo, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense as addExpenseAction, deleteExpense as deleteExpenseAction } from '../store/expenseSlice.js';
import { filterReducer, initialFilter } from './filterReducer.js';

export function useExpenses() {
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses.items);
  const [filter, filterDispatch] = useReducer(filterReducer, initialFilter);

  const filtered = useMemo(
    () => (filter.category === 'All' ? expenses : expenses.filter(e => e.category === filter.category)),
    [expenses, filter.category]
  );

  const total = useMemo(() => filtered.reduce((sum, e) => sum + e.amount, 0), [filtered]);

  const addExpense = useCallback(data => dispatch(addExpenseAction(data)), [dispatch]);
  const deleteExpense = useCallback(id => dispatch(deleteExpenseAction(id)), [dispatch]);

  const setCategory = useCallback(c => filterDispatch({ type: 'SET_CATEGORY', payload: c }), []);
  const resetFilter = useCallback(() => filterDispatch({ type: 'RESET' }), []);

  return { expenses: filtered, total, category: filter.category, setCategory, resetFilter, addExpense, deleteExpense };
}