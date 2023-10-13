import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../services/api';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { State } from '../../types/state-type';
import { Action } from '@reduxjs/toolkit';
import { makeFakeOffer } from '../../utils/mocks';
import {
  AppRoute,
  AuthorizationStatus,
  LOCATIONS_LIST,
  OPTIONS_SORTING,
} from '../../const';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';
import App from './app';
import { render, screen } from '@testing-library/react';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  State,
  Action<string>,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const fakeOffer = makeFakeOffer();

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.Unknown,
    userData: null,
  },
  DATA: {
    city: LOCATIONS_LIST[0],
    optionSorting: OPTIONS_SORTING[0],
    offers: [],
    offer: fakeOffer,
    isOffersLoading: false,
    isOfferLoading: false,
    nearOffers: [],
    hasErrorOffers: false,
    hasErrorOffer: false,
    hasErrorNearOffers: false,
  },
  COMMENT: {
    reviews: [],
    hasErrorReview: false,
    isReviewSend: false,
  },
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App locations={LOCATIONS_LIST} />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  test('should render "MainPage" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(
      screen.getByText(/No places to stay available/i)
    ).toBeInTheDocument();
  });

  test('should render "PropertyPage" when user navigate to "/offer/:id"', () => {
    history.push(AppRoute.Room);
    render(fakeApp);

    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();
    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
  });

  test('should render "NotFoundPage" when user navigate to non-existent route"', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });

  test('should render "LoginPage" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);
    render(fakeApp);

    expect(screen.getAllByText(/Sign in/i).length).toBe(2);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
