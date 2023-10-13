import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import UsersReviews from './users-reviews';
import HistoryRouter from '../history-router/history-router';
import { Provider } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { makeFakeReview } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeReview = makeFakeReview();

const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: null,
  },
  COMMENT: {
    reviews: [fakeReview],
    hasErrorReview: false,
    isReviewSend: false,
  },
});

const fakeUsersReviews = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <UsersReviews />
    </HistoryRouter>
  </Provider>
);

describe('Component: UsersReviews', () => {
  test('should render correctly', () => {
    render(fakeUsersReviews);

    expect(screen.getByTestId('reviews')).toBeInTheDocument();
  });

  test('should miss render "FormReview" with "AuthorizationStatus.NoAuth"', () => {
    render(fakeUsersReviews);

    expect(screen.queryByText('Your review')).not.toBeInTheDocument();
  });
});
