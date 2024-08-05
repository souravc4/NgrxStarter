import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FocusOnEditDirective } from '../../../shared/directives/focus-on-edit/focus-on-edit.directive';
import { InputKeyboardAccessibleDirective } from '../../../shared/directives/input-keyboard-accessible/input-keyboard-accessible.directive';

@Component({
  selector: 'td[editable-cell]',
  standalone: true,
  imports: [
    FocusOnEditDirective,
    ReactiveFormsModule,
    InputKeyboardAccessibleDirective,
  ],
  templateUrl: './editable-cell.component.html',
  styleUrl: './editable-cell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableCellComponent {
  isEditing = input.required<boolean>();
  formId = input.required<string>();
  control = input.required<FormControl>();
  name = input.required<string>();
  type = input<HTMLInputElement['type']>('text');
  value = input.required();
  error = input();
  focusOnEdit = input(false);
  inputId = computed(() => `${this.formId()}-${this.name()}`);
}
