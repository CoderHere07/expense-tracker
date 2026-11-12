import { lazy, Suspense, useCallback, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../auth/AuthContext';
import { useExpenses } from '../hooks/useExpenses';
import { CATEGORIES } from '../data/dummyExpenses';
import { loadExpenses } from '../store/expenseSlice';
import { loadForUser } from '../store/persistence';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseItem from '../components/ExpenseItem';

const ExpenseDetailsModal = lazy(() => import('../components/ExpenseDetailsModal'));

export default function Dashboard() {
  const { user, logout } = useAuth();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(loadExpenses({ owner: user.email, items: loadForUser(user.email) }));
  }, [dispatch, user.email]);

  const { expenses, total, category, setCategory, addExpense, deleteExpense } = useExpenses();
  const [selected, setSelected] = useState(null);

  const openDetails = useCallback(expense => setSelected(expense), []);

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Hi, {user.name}</h1>
        <button className="text-sm text-red-600" onClick={logout}>Logout</button>
      </header>

      <div className="rounded-xl bg-indigo-600 p-4 text-white">
        <p className="text-sm">Total ({category})</p>
        <p className="text-3xl font-bold">Rs {total.toLocaleString()}</p>
      </div>

      <AddExpenseForm onAdd={addExpense} />

      <select aria-label="Filter category" value={category}
        onChange={e => setCategory(e.target.value)} className="rounded border px-3 py-2">
        <option>All</option>
        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
      </select>

      <ul className="space-y-2">
        {expenses.map(e => (
          <ExpenseItem key={e.id} expense={e} onDelete={deleteExpense} onDetails={openDetails} />
        ))}
      </ul>

      {selected && (
        <Suspense fallback={<p className="text-center">Loading...</p>}>
          <ExpenseDetailsModal expense={selected} onClose={() => setSelected(null)} />
        </Suspense>
      )}
    </div>
  );
}