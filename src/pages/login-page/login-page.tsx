import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import React, { FormEvent, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthData } from '../../types/auth-data-type';
import { loginAction } from '../../store/api-action';
import { switchCity } from '../../store/app-data/app-data.slice';
import { AuthorizationStatus, LOCATIONS_LIST } from '../../const';
import { AppRoute } from '../../const';
import { toast } from 'react-toastify';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

export default function LoginPage() {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const onSubmit = (authData: AuthData) => {
    dispatch(loginAction(authData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {
      if (isPasswordValidate(passwordRef.current.value)) {
        onSubmit({
          login: loginRef.current.value,
          password: passwordRef.current.value,
        });
      } else {
        toast.warning(
          'Password must contain at least one letter and at least one number'
        );
      }
    }
  };

  const isPasswordValidate = (password: string): boolean => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{2,}$/g;
    return regex.test(password);
  };

  const getRandomCity =
    LOCATIONS_LIST[Math.floor(Math.random() * LOCATIONS_LIST.length)];
  const handleRedirectToCity = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    dispatch(switchCity(getRandomCity));
    navigate(AppRoute.Main);
  };

  return authorizationStatus === AuthorizationStatus.Auth ? (
    <Navigate to={AppRoute.Main} />
  ) : (
    <>
      <Helmet>
        <title>6/Cities.Login</title>
      </Helmet>

      <main className='page__main page__main--login'>
        <div className='page__login-container container'>
          <section className='login'>
            <h1 className='login__title' style={{ display: 'flex' }}>
              Sign in
            </h1>
            <form
              className='login__form form'
              action='#'
              method='post'
              onSubmit={handleSubmit}
            >
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>E-mail</label>
                <input
                  ref={loginRef}
                  className='login__input form__input'
                  type='email'
                  name='email'
                  placeholder='Email'
                  required
                />
              </div>
              <div className='login__input-wrapper form__input-wrapper'>
                <label className='visually-hidden'>Password</label>
                <input
                  ref={passwordRef}
                  className='login__input form__input'
                  type='password'
                  name='password'
                  placeholder='Password'
                  required
                />
              </div>
              <button
                className='login__submit form__submit button'
                type='submit'
              >
                Sign in
              </button>
            </form>
          </section>
          <section className='locations locations--login locations--current'>
            <div className='locations__item'>
              <Link
                className='locations__item-link'
                to='#'
                onClick={(evt) => handleRedirectToCity(evt)}
              >
                <span>{getRandomCity}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
