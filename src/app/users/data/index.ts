import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from './users.effects';

export const provideUsers = [provideEffects(UsersEffects)];
