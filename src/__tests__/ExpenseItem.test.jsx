import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExpenseItem from '../components/ExpenseItem';

const expense = { id: 'x1', title: 'Biryani', amount: 450, category: 'Food', date: '2026-10-05' };

test('ExpenseItem shows the title and category', () => {
  render(<ExpenseItem expense={expense} onDelete={() => {}} onDetails={() => {}} />);
  expect(screen.getByText('Biryani')).toBeInTheDocument();
  expect(screen.getByText('Food')).toBeInTheDocument();
});

test('clicking Delete calls onDelete with the expense id', async () => {
  const onDelete = jest.fn();
  render(<ExpenseItem expense={expense} onDelete={onDelete} onDetails={() => {}} />);
  await userEvent.click(screen.getByRole('button', { name: /delete/i }));
  expect(onDelete).toHaveBeenCalledWith('x1');
});