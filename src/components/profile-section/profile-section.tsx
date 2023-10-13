import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-action';
import {
  getAuthorizationStatus,
  getUserData,
} from '../../store/user-process/user-process.selectors';
import React from 'react';

export default function ProfileSection(): JSX.Element {
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(getAuthorizationStatus);
  const userData = useAppSelector(getUserData);

  const handleLogOutClick = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  if (authStatus === AuthorizationStatus.Auth) {
    return (
      <nav className='header__nav'>
        <ul className='header__nav-list'>
          <li className='header__nav-item user'>
            <div className='header__nav-profile'>
              <div className='header__avatar-wrapper user__avatar-wrapper'>
                <img
                  className='reviews__avatar user__avatar'
                  src={userData?.avatarUrl}
                  alt='user-avatar'
                />
              </div>
              <span className='header__user-name user__name'>
                {userData?.email}
              </span>
            </div>
          </li>
          <li className='header__nav-item'>
            <Link
              className='header__nav-link'
              style={{ textDecoration: 'none' }}
              to=''
              onClick={handleLogOutClick}
            >
              <span className='header__signout'>Log Out</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className='header__nav'>
        <ul className='header__nav-list'>
          <li className='header__nav-item user'>
            <Link
              className='header__nav-link header__nav-link--profile'
              style={{ textDecoration: 'none' }}
              to='/login'
            >
              <div className='header__avatar-wrapper user__avatar-wrapper'></div>
              <span className='header__login'>Login</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
