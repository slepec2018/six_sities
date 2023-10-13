import { createSlice } from '@reduxjs/toolkit';
import { ReviewData } from '../../types/state-type';
import { NameSpace } from '../../const';
import { fetchReviewsAction, sendReviewAction } from '../api-action';

const initialState: ReviewData = {
  reviews: [],
  hasErrorReview: false,
  isReviewSend: false,
};

export const reviewData = createSlice({
  name: NameSpace.Comment,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsAction.pending, (state) => {
        state.hasErrorReview = false;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.hasErrorReview = true;
      })
      .addCase(sendReviewAction.pending, (state) => {
        state.hasErrorReview = false;
        state.isReviewSend = true;
      })
      .addCase(sendReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewSend = false;
      })
      .addCase(sendReviewAction.rejected, (state) => {
        state.hasErrorReview = true;
        state.isReviewSend = false;
      });
  },
});
