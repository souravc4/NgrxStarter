import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostListener,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EditableCellComponent } from '../editable-cell/editable-cell.component';
import { User } from './../../models/user';

@Component({
  selector: '[app-user-table-row]',
  standalone: true,
  imports: [ReactiveFormsModule, EditableCellComponent],
  templateUrl: './user-table-row.component.html',
  styleUrl: './user-table-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableRowComponent {
  #nnfb = inject(NonNullableFormBuilder);

  user = input.required<User>();
  formId = computed(() => `user-form-${this.user().id}`);
  isEditing = signal(false);

  userForm = this.#nnfb.group({
    id: [-1, [Validators.required, Validators.min(0)]],
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
  });

  saveUser = output<User>();

  constructor() {
    effect(() => {
      this.#patchFormValue(this.user());
    });
  }

  @HostListener('escape')
  onCancel() {
    this.#patchFormValue(this.user());
    this.isEditing.set(false);
  }

  onEdit() {
    this.isEditing.set(true);
  }

  onSubmit() {
    if (this.userForm.invalid) return;

    const userData = this.userForm.getRawValue();
    this.saveUser.emit(userData);
    this.isEditing.set(false);
  }

  #patchFormValue(user: User) {
    const { id, name, username, email } = user;
    this.userForm.patchValue({ id, name, username, email });
  }
}
