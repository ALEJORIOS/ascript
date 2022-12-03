import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[ClickOutside]'
})
export class ClickOutsideDirective {

  constructor(private elementRef: ElementRef) { }
  @Output("out") out = new EventEmitter<any>(); 
  @Output("in") in = new EventEmitter<any>(); 
  @HostListener('document:click', ['$event'])
  clickLocation(event: PointerEvent) {
    console.log('click izquierdo');
    if(this.elementRef.nativeElement.contains(event.target)){
      this.in.emit({left: true})
    }else{
      this.out.emit({left: true});
    }
  }

  @HostListener('document:contextmenu', ['$event'])
  rightClickLocation(event: PointerEvent) {
    console.log('click derecho');
    if(this.elementRef.nativeElement.contains(event.target)){
      this.in.emit({right: true})
    }else{
      this.out.emit({right: true});
    }
  }
}
