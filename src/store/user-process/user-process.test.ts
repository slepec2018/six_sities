import { AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/state-type';
import { makeFakeUserData } from '../../utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from '../api-action';
import { userProcess } from './user-process.slice';

const fakeUserData = makeFakeUserData();

describe('Reducer: userProcess', () => {
  let initialState: UserProcess;
  beforeEach(() => {
    initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null,
    };
  });

  test('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual({
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null,
    });
  });

  describe('checkAuthAction test', () => {
    test('should update authorizationStatus to "AUTH" if checkAuthAction fulfilled', () => {
      expect(
        userProcess.reducer(initialState, {
          type: checkAuthAction.fulfilled.type,
        })
      ).toEqual({ authorizationStatus: AuthorizationStatus.Auth });
    });

    test('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(
        userProcess.reducer(initialState, {
          type: checkAuthAction.rejected.type,
        })
      ).toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      });
    });
  });

  describe('loginAction test', () => {
    test('should update authorizationStatus to "AUTH" if loginAction fulfilled', () => {
      expect(
        userProcess.reducer(initialState, {
          type: loginAction.fulfilled.type,
          payload: fakeUserData,
        })
      ).toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        userData: fakeUserData,
      });
    });

    test('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(
        userProcess.reducer(initialState, { type: loginAction.rejected.type })
      ).toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      });
    });
  });

  describe('logoutAction test', () => {
    test('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(
        userProcess.reducer(initialState, { type: logoutAction.fulfilled.type })
      ).toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
      });
    });
  });
});
