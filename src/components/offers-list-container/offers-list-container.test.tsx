import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { makeFakeOffers } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import { Offers } from '../../types/offers-type';
import { LOCATIONS_LIST, OPTIONS_SORTING } from '../../const';
import OffersListContainer from './offers-list-container';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeOffers = makeFakeOffers();
const getFakeCurrentOffers = (city: string, offers: Offers) =>
  offers.filter((offer) => offer.city.name === city);

describe('Component: OffersContainer', () => {
  test('should render correctly when has offers', () => {
    const fakeCurrentOffers = getFakeCurrentOffers(
      LOCATIONS_LIST[0],
      fakeOffers
    );

    const store = mockStore({
      DATA: {
        city: LOCATIONS_LIST[0],
        optionSorting: OPTIONS_SORTING[0],
        offers: fakeCurrentOffers,
        offer: null,
        isOffersLoading: false,
        isOfferLoading: false,
        nearOffers: [],
        hasErrorOffers: false,
        hasErrorOffer: false,
        hasErrorNearOffers: false,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OffersListContainer />
        </HistoryRouter>
      </Provider>
    );

    const listItems = screen.getAllByRole('listitem', { name: 'place-card' });
    expect(listItems.length).toBe(fakeCurrentOffers.length);
  });
  test('should render correctly when offers by City empty', () => {
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

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OffersListContainer />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });
});
