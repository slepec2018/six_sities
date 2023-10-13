import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { LOCATIONS_LIST, OPTIONS_SORTING } from '../../const';
import { makeFakeOffers } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';
import CitiesPlacesList from './cities-places-list';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: CitiesPlacesList', () => {
  test('should render correctly', () => {
    const fakeOffers = makeFakeOffers();
    const store = mockStore({
      DATA: {
        city: LOCATIONS_LIST[0],
        optionSorting: OPTIONS_SORTING[0],
        offers: fakeOffers,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CitiesPlacesList
            offers={fakeOffers}
            onMouseEnterHandler={jest.fn()}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('cities-places-list')).toBeInTheDocument();
  });
});
