import { createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { User } from '../models/user';
import { usersActions } from './users.actions';

export const adapter = createEntityAdapter<User>();

export const initialState = adapter.getInitialState({});

export const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,
    on(usersActions.loaded, (state, { users }) =>
      adapter.setAll(users, { ...state, isLoaded: true })
    ),
    on(usersActions.updated, (state, { user }) => adapter.setOne(user, state))
  ),
  extraSelectors: ({ selectUsersState }) => ({
    ...adapter.getSelectors(selectUsersState),
  }),
});

export const {
  name: usersFeatureKey,
  reducer: usersReducer,
  selectAll: selectAllUsers,
} = usersFeature;
