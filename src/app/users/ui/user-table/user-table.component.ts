import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UsersFacade } from '../../data/users.facade';
import { UserTableRowComponent } from '../user-table-row/user-table-row.component';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [AsyncPipe, UserTableRowComponent],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
  #userFacade = inject(UsersFacade);
  users = toSignal(this.#userFacade.users$);

  onSaveUser(user: User) {
    this.#userFacade.updateUser(user);
  }
}
