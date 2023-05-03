import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, ref, string } from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';

import { configureApi } from '~/helpers/apiHelper';
import { useAuth } from './Auth.context';

import styles from './Auth.module.css';
import clsx from 'clsx';

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
  const { pathname } = useLocation();
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
      navigate('/');
    } catch (e) {
      // if (e instanceof ApiError) {
      // }
      throw e;
    }
  }

  return (
    <>
      <h1>{isRegister ? 'Register' : 'Login'}</h1>
      <form className={styles.form} onSubmit={handleSubmit(handleAuth)}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register('email')}
          className={clsx({ [styles.invalid]: errors.email })}
        />
        {errors?.email && (
          <p className={styles.fieldError}>{errors.email.message}</p>
        )}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password')}
          className={clsx({ [styles.invalid]: errors.password })}
        />
        {errors?.password && (
          <p className={styles.fieldError}>{errors.password.message}</p>
        )}
        {isRegister && (
          <>
            <label htmlFor="retype_password">Retype Password</label>
            <input
              type="password"
              id="retype_password"
              {...register('retype_password')}
              className={clsx({ [styles.invalid]: errors.retype_password })}
            />
            {errors?.retype_password && (
              <p className={styles.fieldError}>
                {errors.retype_password.message}
              </p>
            )}

            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              {...register('firstName')}
              className={clsx({ [styles.invalid]: errors.firstName })}
            />
            {errors?.firstName && (
              <p className={styles.fieldError}>{errors.firstName.message}</p>
            )}

            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              {...register('lastName')}
              className={clsx({ [styles.invalid]: errors.lastName })}
            />
            {errors?.lastName && (
              <p className={styles.fieldError}>{errors.lastName.message}</p>
            )}
          </>
        )}
        ;
        <button type="submit" className="btn">
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
    </>
  );
}
