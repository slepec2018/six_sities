import { ReviewData } from '../../types/state-type';
import { makeFakeReviews } from '../../utils/mocks';
import { fetchReviewsAction, sendReviewAction } from '../api-action';
import { reviewData } from './review-data.slice';

const fakeReviews = makeFakeReviews();
const getModifiedState = (state: ReviewData) =>
  JSON.parse(JSON.stringify(state)) as ReviewData;

describe('Reducer: reviewData', () => {
  let initialState: ReviewData;
  beforeEach(() => {
    initialState = {
      reviews: [],
      hasErrorReview: false,
      isReviewSend: false,
    };
  });

  test('without additional parameters should return initial state', () => {
    expect(reviewData.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  test('should update reviews when load reviews', () => {
    const modifiedState = getModifiedState(initialState);
    modifiedState.reviews = fakeReviews;
    expect(
      reviewData.reducer(initialState, {
        type: fetchReviewsAction.fulfilled.type,
        payload: fakeReviews,
      })
    ).toEqual(modifiedState);
  });

  test('should update reviews after send review', () => {
    const modifiedState = getModifiedState(initialState);
    modifiedState.hasErrorReview = false;
    modifiedState.isReviewSend = true;
    expect(
      reviewData.reducer(initialState, { type: sendReviewAction.pending.type })
    ).toEqual(modifiedState);

    modifiedState.reviews = fakeReviews;
    modifiedState.hasErrorReview = false;
    modifiedState.isReviewSend = false;
    expect(
      reviewData.reducer(initialState, {
        type: sendReviewAction.fulfilled.type,
        payload: fakeReviews,
      })
    ).toEqual(modifiedState);

    modifiedState.reviews = [];
    modifiedState.hasErrorReview = true;
    modifiedState.isReviewSend = false;
    expect(
      reviewData.reducer(initialState, { type: sendReviewAction.rejected.type })
    ).toEqual(modifiedState);
  });
});
