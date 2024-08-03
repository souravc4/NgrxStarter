import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { GetUserResponse } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  readonly #ENDPOINT = `${environment.api}/users`;

  #http = inject(HttpClient);

  getAllUsers() {
    return this.#http.get<GetUserResponse>(this.#ENDPOINT);
  }
}
