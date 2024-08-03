import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './users.reducer';

export interface State {
  users: fromUsers.State;
}

export const selectUsersState = createFeatureSelector<fromUsers.State>('users');

export const selectAllUsers = createSelector(
  selectUsersState,
  fromUsers.selectAll
);
