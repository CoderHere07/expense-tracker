import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

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

  const input = 'w-full rounded border px-3 py-2';

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit(onSubmit)} className="w-80 space-y-3 rounded-xl bg-white p-6 shadow">
        <h1 className="text-xl font-bold">{isSignup ? 'Sign up' : 'Login'}</h1>

        {isSignup && (
          <div>
            <input className={input} placeholder="Name" {...register('name', { required: 'Name required' })} />
            {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
          </div>
        )}

        <div>
          <input className={input} placeholder="Email" {...register('email', { required: 'Email required' })} />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <input type="password" className={input} placeholder="Password"
            {...register('password', { required: 'Password required', minLength: { value: 4, message: 'Min 4 chars' } })} />
          {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
        </div>

        {serverError && <p className="text-sm text-red-600">{serverError}</p>}

        <button className="w-full rounded bg-indigo-600 py-2 text-white">
          {isSignup ? 'Create account' : 'Login'}
        </button>
        <button type="button" className="w-full text-sm text-indigo-600"
          onClick={() => { setIsSignup(s => !s); setServerError(''); }}>
          {isSignup ? 'Already have an account? Login' : 'New here? Sign up'}
        </button>
      </form>
    </div>
  );
}