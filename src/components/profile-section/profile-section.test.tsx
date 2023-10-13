import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import ProfileSection from './profile-section';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeFakeUserData } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: ProfileSection', () => {
  test('should render correctly when user not authed', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProfileSection />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  test('should render correctly when user authed', () => {
    const fakeUserData = makeFakeUserData();

    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: fakeUserData,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ProfileSection />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Log Out')).toBeInTheDocument();
    expect(screen.getByText(fakeUserData.email)).toBeInTheDocument();
  });

  test('should render correctly when location.pathname is /login', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });

    history.push(AppRoute.Login);
    render(
      <Provider store={store}>
        <Router location={history.location} navigator={history}>
          <ProfileSection />
        </Router>
      </Provider>
    );

    expect(screen.queryByText('Log in')).not.toBeInTheDocument();
  });
});
