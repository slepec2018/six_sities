import { render, screen } from '@testing-library/react';
import ItemReview from './item-review';
import { makeFakeReview } from '../../utils/mocks';
import { getFormattedDateForReview } from '../../general';

describe('Component: ItemReview', () => {
  test('should render correctly', () => {
    const fakeReview = makeFakeReview();
    const reviewViewDate = getFormattedDateForReview(fakeReview.date);

    render(<ItemReview review={fakeReview} />);

    expect(screen.getByText(fakeReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.comment)).toBeInTheDocument();
    expect(screen.getByText(reviewViewDate)).toBeInTheDocument();
  });
});
