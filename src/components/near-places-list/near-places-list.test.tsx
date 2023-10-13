import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { LOCATIONS_LIST, OPTIONS_SORTING } from '../../const';
import { makeFakeNearOffers } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';
import NearPlacesList from './near-places-list';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';

const mockStore = configureMockStore();
const history = createMemoryHistory();

const fakeNearOffers = makeFakeNearOffers();
const store = mockStore({
  DATA: {
    city: LOCATIONS_LIST[0],
    optionSorting: OPTIONS_SORTING[0],
  },
});
const fakeNearPlacesList = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <NearPlacesList offers={fakeNearOffers} />
    </HistoryRouter>
  </Provider>
);

describe('Component: NearPlacesList', () => {
  test('should render correctly', () => {
    render(fakeNearPlacesList);

    expect(screen.getByTestId('near-places-list')).toBeInTheDocument();
  });

  test('should render correctly when has nearOffers', () => {
    render(fakeNearPlacesList);

    const listItems = screen.getAllByRole('listitem', { name: 'place-card' });
    expect(listItems.length).toBe(fakeNearOffers.length);
  });
});
