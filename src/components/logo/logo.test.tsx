import { render, screen } from '@testing-library/react';
import Logo from './logo';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  test('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Logo />
      </HistoryRouter>
    );

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });
});
