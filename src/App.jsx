import { Route, Routes } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './auth/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}