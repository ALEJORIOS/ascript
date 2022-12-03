import { Directive, HostListener } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[PreventRightClick]'
})
export class PreventRightClickDirective {

  constructor() { }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: PointerEvent) {
    event.preventDefault();
  }

}
