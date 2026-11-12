import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../auth/AuthContext';
import ProtectedRoute from '../auth/ProtectedRoute';
import ErrorBoundary from '../components/ErrorBoundary';

beforeEach(() => localStorage.clear());

test('redirects to the login page when visiting /dashboard while logged out', () => {
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

test('ErrorBoundary shows the fallback UI when a child crashes', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  const Bomb = () => { throw new Error('boom'); };
  render(<ErrorBoundary><Bomb /></ErrorBoundary>);
  expect(screen.getByRole('alert')).toBeInTheDocument();
  console.error.mockRestore();
});