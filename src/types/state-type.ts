import { AuthorizationStatus } from '../const';
import { store } from '../store';
import { Offer, Offers } from './offers-type';
import { Reviews } from './review-type';
import { UserData } from './user-data-type';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

export type AppData = {
  city: string;
  optionSorting: string;
  offers: Offers;
  offer: Offer | null;
  isOffersLoading: boolean;
  isOfferLoading: boolean;
  nearOffers: Offers;
  hasErrorOffers: boolean;
  hasErrorOffer: boolean;
  hasErrorNearOffers: boolean;
};

export type ReviewData = {
  reviews: Reviews;
  hasErrorReview: boolean;
  isReviewSend: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
