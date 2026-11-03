import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddExpenseForm from '../components/AddExpenseForm.jsx';

test('title less than 3 show error', async () => {
  const onAdd = jest.fn();
  render(<AddExpenseForm onAdd={onAdd} />);
  await userEvent.type(screen.getByLabelText('Title'), 'ab');
  await userEvent.type(screen.getByLabelText('Amount'), '100');
  await userEvent.click(screen.getByRole('button', { name: /add expense/i }));
  expect(await screen.findByText(/at least 3 characters/i)).toBeInTheDocument();
  expect(onAdd).not.toHaveBeenCalled();
});

test('amount 0 show error', async () => {
  const onAdd = jest.fn();
  render(<AddExpenseForm onAdd={onAdd} />);
  await userEvent.type(screen.getByLabelText('Title'), 'Lunch');
  await userEvent.type(screen.getByLabelText('Amount'), '0');
  await userEvent.click(screen.getByRole('button', { name: /add expense/i }));
  expect(await screen.findByText(/greater than 0/i)).toBeInTheDocument();
  expect(onAdd).not.toHaveBeenCalled();
});