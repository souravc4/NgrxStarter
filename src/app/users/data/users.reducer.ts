import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../models/user';
import { createFeature, createReducer, on } from '@ngrx/store';
import { usersActions } from './users.actions';

export interface State extends EntityState<User> {}

export const adapter = createEntityAdapter<User>();

export const initialState = adapter.getInitialState({});

export const usersFeature = createFeature({
  name: 'users',
  reducer: createReducer(
    initialState,
    on(usersActions.load, (state) => state),
    on(usersActions.loaded, (state, { users }) =>
      adapter.setAll(users, { ...state, isLoaded: true })
    )
  ),
});

export const { selectAll, selectEntities, selectIds, selectTotal } =
  adapter.getSelectors();
