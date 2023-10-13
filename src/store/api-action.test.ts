import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { State } from '../types/state-type';
import { Action } from 'redux';
import {
  makeFakeComment,
  makeFakeOffer,
  makeFakeOffers,
  makeFakeReviews,
  makeFakeUserData,
} from '../utils/mocks';
import { APIRoute } from '../const';
import {
  checkAuthAction,
  fetchNearOffersAction,
  fetchOfferAction,
  fetchOffersAction,
  fetchReviewsAction,
  sendReviewAction,
} from './api-action';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  test('should authorization status is «auth» when server return 200 and userData', async () => {
    const fakeUserData = makeFakeUserData();
    const store = mockStore();
    mockAPI.onGet(APIRoute.Login).reply(200, fakeUserData);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
    ]);
  });

  test('should dispatch fetchOffersAction when GET /hotels', async () => {
    const fakeOffers = makeFakeOffers();

    mockAPI.onGet(APIRoute.Offers).reply(200, fakeOffers);

    const store = mockStore();
    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type,
    ]);
  });

  test('should dispatch fetchOfferAction when GET /hotels:id', async () => {
    const fakeOffer = makeFakeOffer();
    const offerId = { id: 5 };

    mockAPI.onGet(`${APIRoute.Offers}/${offerId.id}`).reply(200, fakeOffer);

    const store = mockStore();
    await store.dispatch(fetchOfferAction(offerId));

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchOfferAction.pending.type,
      fetchOfferAction.fulfilled.type,
    ]);
  });

  test('should dispatch fetchNearOffersAction when GET /hotels:id/nearby', async () => {
    const fakeOffers = makeFakeOffers();
    const offerId = { id: 5 };

    mockAPI
      .onGet(`${APIRoute.Offers}/${offerId.id}/nearby`)
      .reply(200, fakeOffers);

    const store = mockStore();
    await store.dispatch(fetchNearOffersAction(offerId));

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchNearOffersAction.pending.type,
      fetchNearOffersAction.fulfilled.type,
    ]);
  });

  test('should dispatch fetchReviewsAction when GET /comments/:offerId', async () => {
    const fakeReviews = makeFakeReviews();
    const offerId = { id: 5 };

    mockAPI.onGet(`${APIRoute.Comments}/${offerId.id}`).reply(200, fakeReviews);

    const store = mockStore();
    await store.dispatch(fetchReviewsAction(offerId));

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type,
    ]);
  });

  test('should dispatch sendReviewAction when POST /comments/:offerId', async () => {
    const fakeReviews = makeFakeReviews();
    const offerId = { id: 10 };
    const fakeReview = makeFakeComment();
    fakeReview.hotelId = offerId.id;

    mockAPI
      .onPost(`${APIRoute.Comments}/${offerId.id}`)
      .reply(200, fakeReviews);

    const store = mockStore();
    await store.dispatch(sendReviewAction(fakeReview));

    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      sendReviewAction.pending.type,
      sendReviewAction.fulfilled.type,
    ]);
  });
});
