import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  output,
} from '@angular/core';

@Directive({
  selector: 'input[inputKeyboardAccessible]',
  standalone: true,
})
export class InputKeyboardAccessibleDirective {
  #host = inject<ElementRef<HTMLInputElement>>(ElementRef);

  @HostListener('keydown.escape')
  onEscape() {
    this.#host.nativeElement.dispatchEvent(
      new CustomEvent('escape', { bubbles: true })
    );
  }
}
