import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddExpenseForm from '../components/AddExpenseForm';

test('shows an error when the title is shorter than 3 characters', async () => {
  const onAdd = jest.fn();
  render(<AddExpenseForm onAdd={onAdd} />);
  await userEvent.type(screen.getByLabelText('Title'), 'ab');
  await userEvent.type(screen.getByLabelText('Amount'), '100');
  await userEvent.click(screen.getByRole('button', { name: /add expense/i }));
  expect(await screen.findByText(/at least 3 characters/i)).toBeInTheDocument();
  expect(onAdd).not.toHaveBeenCalled();
});

test('shows an error when the amount is 0', async () => {
  const onAdd = jest.fn();
  render(<AddExpenseForm onAdd={onAdd} />);
  await userEvent.type(screen.getByLabelText('Title'), 'Lunch');
  await userEvent.type(screen.getByLabelText('Amount'), '0');
  await userEvent.click(screen.getByRole('button', { name: /add expense/i }));
  expect(await screen.findByText(/greater than 0/i)).toBeInTheDocument();
  expect(onAdd).not.toHaveBeenCalled();
});