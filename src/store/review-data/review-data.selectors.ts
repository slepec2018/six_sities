import { NameSpace } from '../../const';
import { Reviews } from '../../types/review-type';
import { State } from '../../types/state-type';

export const getReviews = (state: State): Reviews =>
  state[NameSpace.Comment].reviews;
export const getErrorReviewStatus = (state: State): boolean =>
  state[NameSpace.Comment].hasErrorReview;
export const getReviewSendStatus = (state: State): boolean =>
  state[NameSpace.Comment].isReviewSend;
