import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, ref, string } from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';

import { configureApi } from '~/helpers/apiHelper';
import { useAuth } from './Auth.context';

import styles from './Auth.module.css';
import clsx from 'clsx';
import { Input } from '~/components';
import { useEffect } from 'react';

const commonValidators = {
  email: string().required().email(),
  password: string().required().min(4),
};
const loginSchema = object(commonValidators);
const registerSchema = object({
  ...commonValidators,
  retype_password: string()
    .required()
    .oneOf([ref('password')], 'The passwords need to match.'),
  firstName: string().required(),
  lastName: string().required(),
});

const { create: signup } = configureApi('register');
const { create: signin } = configureApi('login');

export function AuthForms() {
  const { pathname, state } = useLocation();
  let isRegister = true;
  if (pathname !== '/register') {
    isRegister = false;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(isRegister ? registerSchema : loginSchema),
  });

  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  async function handleAuth(data) {
    const { retype_password, ...newUser } = data;

    try {
      let fct = signup;
      if (!isRegister) {
        fct = signin;
      }
      const response = await fct(newUser);

      // save the user and token somehow
      login(response);
      // redirect the user to someplace else
      const destination = state.from ? state.from : '/';
      navigate(destination);
    } catch (e) {
      // if (e instanceof ApiError) {
      // }
      throw e;
    }
  }

  return (
    <>
      <h1>{isRegister ? 'Register' : 'Login'}</h1>
      <form className="pageForm" onSubmit={handleSubmit(handleAuth)}>
        <Input
          type="email"
          label="Email"
          errors={errors}
          placeholder="Email Address"
          {...register('email')}
        />
        <Input
          type="password"
          label="Password"
          errors={errors}
          {...register('password')}
        />
        {isRegister && (
          <>
            <Input
              type="password"
              label="Retype Password"
              errors={errors}
              {...register('retype_password')}
            />
            <Input
              type="text"
              label="First Name"
              errors={errors}
              {...register('firstName')}
            />
            <Input
              type="text"
              label="Last Name"
              errors={errors}
              {...register('lastName')}
            />
          </>
        )}
        <button type="submit" className="btn submitBtn">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
    </>
  );
}
