import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
  #nnfb = inject(FormBuilder);

  user = input.required<User>();
  formId = computed(() => `user-form-${this.user().id}`);
  isEditing = signal(false);

  userForm = this.#nnfb.group({
    id: [-1, [Validators.required, Validators.min(0)]],
    name: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
  });

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
    console.log(this.userForm.getRawValue());
    this.isEditing.set(false);
  }

  #patchFormValue(user: User) {
    const { id, name, username, email } = user;
    this.userForm.patchValue({ id, name, username, email });
  }
}
