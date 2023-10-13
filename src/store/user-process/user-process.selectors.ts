import { AuthorizationStatus, NameSpace } from '../../const';
import { State } from '../../types/state-type';
import { UserData } from '../../types/user-data-type';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;
export const getUserData = (state: State): UserData | null =>
  state[NameSpace.User].userData;
