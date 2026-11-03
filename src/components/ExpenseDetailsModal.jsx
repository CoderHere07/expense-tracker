export default function ExpenseDetailsModal({ expense, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div role="dialog" aria-modal="true" className="w-80 rounded-xl bg-white p-6"
        onClick={e => e.stopPropagation()}>
        <h2 className="mb-3 text-lg font-bold">{expense.title}</h2>
        <p>Amount: Rs {expense.amount.toLocaleString()}</p>
        <p>Category: {expense.category}</p>
        <p>Date: {expense.date}</p>
        <p className="text-xs text-gray-500">ID: {expense.id}</p>
        <button className="mt-4 rounded bg-gray-800 px-4 py-2 text-white" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}