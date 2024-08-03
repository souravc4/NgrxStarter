import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { usersActions } from './users.actions';
import { UsersService } from './users.service';
import { map, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersEffects {
  #actions$ = inject(Actions);
  #usersService = inject(UsersService);

  load$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(usersActions.load),
      switchMap(() => this.#usersService.getAllUsers()),
      map((users) => usersActions.loaded({ users }))
    )
  );
}
