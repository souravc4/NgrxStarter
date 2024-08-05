import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../models/user';
import { usersActions } from './users.actions';
import { selectAllUsers } from './users.selectors';

@Injectable({ providedIn: 'root' })
export class UsersFacade {
  #store = inject(Store);

  #isLoaded = false;

  get users$() {
    this.#assertIsLoaded();
    return this.#store.select(selectAllUsers);
  }

  #assertIsLoaded() {
    if (!this.#isLoaded) {
      this.#store.dispatch(usersActions.load());
      this.#isLoaded = true;
    }
  }

  updateUser(user: User) {
    this.#store.dispatch(usersActions.update({ user }));
  }
}
