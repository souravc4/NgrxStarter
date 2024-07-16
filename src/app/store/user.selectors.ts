import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducers';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);
