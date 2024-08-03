import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UsersFacade } from '../../data/users.facade';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [AsyncPipe, TableModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent {
  #userFacade = inject(UsersFacade);

  users$ = this.#userFacade.users$;
}
