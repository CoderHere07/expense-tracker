export default function ExpenseDetailsModal({ expense, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label="Expense details"
        className="sk-slip w-full max-w-sm" onClick={e => e.stopPropagation()}>
        <h2 className="mb-3 border-b-2 border-dashed border-stone-400 pb-2 text-lg font-bold">{expense.title}</h2>
        <p>Amount: Rs {expense.amount.toLocaleString()}</p>
        <p>Category: {expense.category}</p>
        <p>Date: {expense.date}</p>
        <p className="text-xs text-stone-500">ID: {expense.id}</p>
        <button className="sk-brass mt-5" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}