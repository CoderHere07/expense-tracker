import { useForm } from 'react-hook-form';
import { CATEGORIES } from '../data/dummyExpenses.js';

export default function AddExpenseForm({ onAdd }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { title: '', amount: '', category: CATEGORIES[0] },
  });

  const onSubmit = data => {
    onAdd({ ...data, amount: Number(data.amount) });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap items-start gap-3">
      <div>
        <input placeholder="Title" aria-label="Title" className="rounded border px-3 py-2"
          {...register('title', { required: 'Title is required', minLength: { value: 3, message: 'Title must be at least 3 characters' } })} />
        {errors.title && <p role="alert" className="text-sm text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <input type="number" step="any" placeholder="Amount" aria-label="Amount" className="rounded border px-3 py-2"
          {...register('amount', { required: 'Amount is required', validate: v => Number(v) > 0 || 'Amount must be greater than 0' })} />
        {errors.amount && <p role="alert" className="text-sm text-red-600">{errors.amount.message}</p>}
      </div>

      <select aria-label="Category" className="rounded border px-3 py-2" {...register('category')}>
        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
      </select>

      <button className="rounded bg-indigo-600 px-4 py-2 text-white">Add Expense</button>
    </form>
  );
}