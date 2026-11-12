import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [serverError, setServerError] = useState('');
  const { user, login, signup } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  if (user) return <Navigate to="/dashboard" replace />;

  const onSubmit = data => {
    try {
      isSignup ? signup(data) : login(data);
      navigate('/dashboard');
    } catch (err) {
      setServerError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="sk-ledger w-full max-w-sm space-y-4 p-8">
        <h1 className="sk-plate text-xl">{isSignup ? 'Sign up' : 'Login'}</h1>

        {isSignup && (
          <div>
            <input className="sk-input" placeholder="Name" aria-label="Name" {...register('name', { required: 'Name is required' })} />
            {errors.name && <p className="sk-err">{errors.name.message}</p>}
          </div>
        )}

        <div>
          <input className="sk-input" placeholder="Email" aria-label="Email" {...register('email', { required: 'Email is required' })} />
          {errors.email && <p className="sk-err">{errors.email.message}</p>}
        </div>

        <div>
          <input type="password" className="sk-input" placeholder="Password" aria-label="Password"
            {...register('password', { required: 'Password is required', minLength: { value: 4, message: 'Password needs at least 4 characters' } })} />
          {errors.password && <p className="sk-err">{errors.password.message}</p>}
        </div>

        {serverError && <p className="sk-err">{serverError}</p>}

        <button className="sk-brass w-full">{isSignup ? 'Create account' : 'Login'}</button>
        <button type="button" className="w-full text-sm text-amber-200 underline"
          onClick={() => { setIsSignup(s => !s); setServerError(''); }}>
          {isSignup ? 'Already have an account? Login' : 'New here? Sign up'}
        </button>
      </form>
    </div>
  );
}