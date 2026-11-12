import { useForm } from 'react-hook-form';
import { CATEGORIES } from '../data/dummyExpenses';

export default function AddExpenseForm({ onAdd }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { title: '', amount: '', category: CATEGORIES[0] },
  });

  const onSubmit = data => {
    onAdd({ ...data, amount: Number(data.amount) });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sk-ledger flex flex-wrap items-start gap-3">
      <div className="min-w-40 flex-1">
        <input placeholder="Title" aria-label="Title" className="sk-input"
          {...register('title', { required: 'Title is required', minLength: { value: 3, message: 'Title must be at least 3 characters' } })} />
        {errors.title && <p role="alert" className="sk-err">{errors.title.message}</p>}
      </div>

      <div className="w-36">
        <input type="number" step="any" placeholder="Amount" aria-label="Amount" className="sk-input"
          {...register('amount', { required: 'Amount is required', validate: v => Number(v) > 0 || 'Amount must be greater than 0' })} />
        {errors.amount && <p role="alert" className="sk-err">{errors.amount.message}</p>}
      </div>

      <select aria-label="Category" className="sk-input w-40" {...register('category')}>
        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
      </select>

      <button className="sk-brass">Add Expense</button>
    </form>
  );
}