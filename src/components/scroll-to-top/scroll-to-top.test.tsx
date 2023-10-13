import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import ScrollToTop from './scroll-to-top';

const history = createMemoryHistory();

describe('Component: ScrollToTop', () => {
  global.scrollTo = jest.fn();
  const fakeApp = (
    <Router location={history.location} navigator={history}>
      <ScrollToTop />
    </Router>
  );
  test('should render correctly and call scrollTo', () => {
    render(fakeApp);
    expect(global.scrollTo).toBeCalledTimes(1);
  });
});
