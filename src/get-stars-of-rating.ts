import { MULTIPLIER_FOR_RATING } from './const';

export const getStarsOfRating = (rating: number): number =>
  Math.round(rating * MULTIPLIER_FOR_RATING);
