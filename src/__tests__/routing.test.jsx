import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../auth/AuthContext.jsx';
import ProtectedRoute from '../auth/ProtectedRoute.jsx';
import ErrorBoundary from '../components/ErrorBoundary.jsx';

beforeEach(() => localStorage.clear());

test('without login, redirect to login page from dashboard', () => {
  render(
    <MemoryRouter initialEntries={['/dashboard']}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<p>Login page</p>} />
          <Route path="/dashboard" element={<ProtectedRoute><p>Secret</p></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
  expect(screen.getByText('Login page')).toBeInTheDocument();
  expect(screen.queryByText('Secret')).not.toBeInTheDocument();
});

test('ErrorBoundary crash show fallback UI', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  const Bomb = () => { throw new Error('boom'); };
  render(<ErrorBoundary><Bomb /></ErrorBoundary>);
  expect(screen.getByRole('alert')).toBeInTheDocument();
  console.error.mockRestore();
});