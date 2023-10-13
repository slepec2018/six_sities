import { fireEvent, render, screen } from '@testing-library/react';
import PlaceCard from './place-card';
import { makeFakeOffer } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();
const fakeOffer = makeFakeOffer();

const onMouseEnterHandler = jest.fn();

const fakePlaceCard = (
  <HistoryRouter history={history}>
    <PlaceCard
      offer={fakeOffer}
      key={fakeOffer.id}
      onMouseEnterHandler={onMouseEnterHandler}
    />
  </HistoryRouter>
);

describe('Component: PlaceCard', () => {
  test('should render correctly', () => {
    render(fakePlaceCard);

    expect(screen.getByText(fakeOffer.title)).toBeInTheDocument();
  });

  test('should redirect to card after click', () => {
    render(fakePlaceCard);

    fireEvent.click(screen.getAllByRole('link')[0]);
    expect(history.location.pathname).toBe(`/offer/${fakeOffer.id}`);
  });

  test('should set active offer after mouse enter', () => {
    render(fakePlaceCard);

    fireEvent.mouseOver(screen.getByRole('listitem'));
    expect(onMouseEnterHandler).toBeCalledTimes(1);
  });
});
