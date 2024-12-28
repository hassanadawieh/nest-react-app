import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast'; // Import toast
import { loginUser, registerUser } from '../store/authSlice';
import Button from '../components/UI/Button';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [status, setStatus] = useState('Register');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const changeStatusHandler = () => {
    setStatus((prevStatus) => (prevStatus === 'Login' ? 'Register' : 'Login'));
    reset();
  };

  const onSubmit = (data) => {
    if (status === 'Register') {
      dispatch(registerUser(data))
        .unwrap()
        .then(() => {
          toast.success('Registration successful! Please log in.');
          setStatus('Login');
          reset();
        })
        .catch((err) => {
          toast.error(`Registration failed: ${err.message}`);
        });
    } else {
      dispatch(loginUser(data))
        .unwrap()
        .then(() => {
          toast.success('Login successful!');
          navigate('/dashboard/products');
         
        })
        .catch((err) => {
          toast.error(`Login failed: ${err.message}`);
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-primary-light to-secondary-light p-4">
      <Toaster /> {/* Toast Container */}
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          {status}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {status === 'Register' && (
            <div>
              <input
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                type="text"
                placeholder="Name"
                {...register('name', {
                  required: status === 'Register' && 'Name is required',
                })}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
          )}
          <div>
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              type="email"
              placeholder="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <input
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <p className="text-sm text-gray-600 mt-4 text-center">
            {status === 'Login'
              ? "Don't have an account?"
              : 'Already have an account?'}{' '}
            <span
              onClick={changeStatusHandler}
              className="text-primary font-medium cursor-pointer hover:underline"
            >
              {status === 'Login' ? 'Register' : 'Login'}
            </span>
          </p>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <div className="mt-6 w-full flex items-center justify-center">
            <Button isLoading={isLoading} type="submit" className={'w-full'}>
              {status}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
