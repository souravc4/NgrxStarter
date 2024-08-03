import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../models/user';

export const usersActions = createActionGroup({
  source: 'Users',
  events: {
    load: emptyProps(),
    loaded: props<{ users: User[] }>(),
  },
});
