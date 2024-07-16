import { createReducer, on } from '@ngrx/store';
import { User } from '../models/user.model';
import * as UserActions from '../store/user.actions';

export interface UserState {
  users: User[];
  error: any;
}

export const initialState: UserState = {
  users: [],
  error: null,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) =>  ({ ...state })),
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(UserActions.updateUser, (state) => ({ ...state })),
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map(u => (u.id === user.id ? user : u)),
  })),
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
