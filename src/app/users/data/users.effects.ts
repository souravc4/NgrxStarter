import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';
import { usersActions } from './users.actions';
import { UsersService } from './users.service';

export const load$ = createEffect(
  (actions = inject(Actions), usersService = inject(UsersService)) =>
    actions.pipe(
      ofType(usersActions.load),
      switchMap(() => usersService.getAllUsers()),
      map((users) => usersActions.loaded({ users }))
    ),
  { functional: true }
);
