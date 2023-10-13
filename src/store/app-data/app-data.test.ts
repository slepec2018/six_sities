import { LOCATIONS_LIST, OPTIONS_SORTING } from '../../const';
import { AppData } from '../../types/state-type';
import { makeFakeOffer, makeFakeOffers } from '../../utils/mocks';
import {
  fetchNearOffersAction,
  fetchOfferAction,
  fetchOffersAction,
} from '../api-action';
import { appData, sortingOffers, switchCity } from './app-data.slice';

const fakeOffers = makeFakeOffers();
const getModifiedState = (state: AppData) =>
  JSON.parse(JSON.stringify(state)) as AppData;

describe('Reducer: appData', () => {
  let initialState: AppData;
  beforeEach(() => {
    initialState = {
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
  });

  test('should update city', () => {
    const modifiedState = getModifiedState(initialState);
    modifiedState.city = LOCATIONS_LIST[5];
    expect(
      appData.reducer(initialState, {
        type: switchCity.type,
        payload: LOCATIONS_LIST[5],
      })
    ).toEqual(modifiedState);
  });

  test('should update optionSorting', () => {
    const modifiedState = getModifiedState(initialState);
    modifiedState.optionSorting = OPTIONS_SORTING[2];
    expect(
      appData.reducer(initialState, {
        type: sortingOffers.type,
        payload: OPTIONS_SORTING[2],
      })
    ).toEqual(modifiedState);
  });

  test('without additional parameters should return initial state', () => {
    expect(appData.reducer(void 0, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  test('should update offers when load offers', () => {
    const modifiedState = getModifiedState(initialState);
    modifiedState.offers = fakeOffers;
    expect(
      appData.reducer(initialState, {
        type: fetchOffersAction.fulfilled.type,
        payload: fakeOffers,
      })
    ).toEqual(modifiedState);
  });

  test('should has error when load offers', () => {
    const modifiedState = getModifiedState(initialState);
    modifiedState.hasErrorOffers = true;
    expect(
      appData.reducer(initialState, {
        type: fetchOffersAction.rejected.type,
      })
    ).toEqual(modifiedState);
  });

  test('should update offer when load offer by id', () => {
    const fakeOffer = makeFakeOffer();
    const modifiedState = getModifiedState(initialState);
    modifiedState.offer = fakeOffer;
    expect(
      appData.reducer(initialState, {
        type: fetchOfferAction.fulfilled.type,
        payload: fakeOffer,
      })
    ).toEqual(modifiedState);
  });

  test('should has error when load offer by id', () => {
    const modifiedState = getModifiedState(initialState);
    modifiedState.hasErrorOffer = true;
    expect(
      appData.reducer(initialState, { type: fetchOfferAction.rejected.type })
    ).toEqual(modifiedState);
  });

  test('should update nearOffers when load near by offers', () => {
    const modifiedState = getModifiedState(initialState);
    modifiedState.nearOffers = fakeOffers;
    expect(
      appData.reducer(initialState, {
        type: fetchNearOffersAction.fulfilled.type,
        payload: fakeOffers,
      })
    ).toEqual(modifiedState);
  });

  test('should has error when load near by offers', () => {
    const modifiedState = getModifiedState(initialState);
    modifiedState.hasErrorNearOffers = true;
    expect(
      appData.reducer(initialState, {
        type: fetchNearOffersAction.rejected.type,
      })
    ).toEqual(modifiedState);
  });
});
