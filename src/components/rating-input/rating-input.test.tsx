import { render, screen } from '@testing-library/react';
import RatingInput from './rating-input';

describe('Component: RatingInput', () => {
  test('should render correctly', () => {
    render(
      <RatingInput onElementChangeHandle={jest.fn()} isInactive={false} />
    );

    expect(screen.getAllByAltText('rating-star').length).toBe(5);
  });
});
