import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppData } from '../../types/state-type';
import { LOCATIONS_LIST, NameSpace, OPTIONS_SORTING } from '../../const';
import {
  fetchNearOffersAction,
  fetchOfferAction,
  fetchOffersAction,
} from '../api-action';

const initialState: AppData = {
  city: LOCATIONS_LIST[0],
  optionSorting: OPTIONS_SORTING[0],
  offers: [],
  offer: null,
  isOffersLoading: false,
  isOfferLoading: false,
  nearOffers: [],
  hasErrorOffers: false,
  hasErrorOffer: false,
  hasErrorNearOffers: false,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    switchCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    sortingOffers: (state, action: PayloadAction<string>) => {
      state.optionSorting = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
        state.hasErrorOffers = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
        state.hasErrorOffers = true;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferLoading = true;
        state.hasErrorOffer = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.hasErrorOffer = true;
        state.isOfferLoading = false;
      })
      .addCase(fetchNearOffersAction.pending, (state) => {
        state.hasErrorNearOffers = false;
      })
      .addCase(fetchNearOffersAction.fulfilled, (state, action) => {
        state.nearOffers = action.payload;
      })
      .addCase(fetchNearOffersAction.rejected, (state) => {
        state.hasErrorNearOffers = true;
      });
  },
});

export const { switchCity, sortingOffers } = appData.actions;
