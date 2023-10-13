import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { LOCATIONS_LIST, OPTIONS_SORTING } from '../../const';
import HistoryRouter from '../history-router/history-router';
import LocationsList from './locations-list';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: LocationList', () => {
  const store = mockStore({
    DATA: {
      city: LOCATIONS_LIST[0],
      optionSorting: OPTIONS_SORTING[0],
    },
  });

  test('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <LocationsList locations={LOCATIONS_LIST} />
        </HistoryRouter>
      </Provider>
    );

    const locationListLength = Object.values(LOCATIONS_LIST).length;
    expect(screen.getAllByRole('link').length).toBe(locationListLength);
  });
});
