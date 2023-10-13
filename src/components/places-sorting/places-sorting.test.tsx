import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { LOCATIONS_LIST, OPTIONS_SORTING } from '../../const';
import HistoryRouter from '../history-router/history-router';
import PlacesSorting from './places-sorting';

// const currentSortOption = OPTIONS_SORTING[0];
// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);
const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    city: LOCATIONS_LIST[0],
    optionSorting: OPTIONS_SORTING[0],
    offers: [],
    offer: null,
    isOffersLoading: false,
    isOfferLoading: false,
    nearOffers: [],
    hasErrorOffers: false,
    hasErrorOffer: false,
    hasErrorNearOffers: false,
  },
});
const history = createMemoryHistory();

describe('Component: PlacesSorting', () => {
  test('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlacesSorting />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getAllByText(OPTIONS_SORTING[0]).length).toBe(2);
  });
});
