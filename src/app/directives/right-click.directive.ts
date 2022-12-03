import { Directive, HostListener, Input } from '@angular/core';
import { ArticlesService } from '../services/articles.service';

@Directive({
  standalone: true,
  selector: '[RightClick]'
})
export class RightClickDirective {

  constructor(private articlesService: ArticlesService) {}

  @Input() data = {};
  @HostListener('contextmenu', ['$event'])
  onRightClick(event: PointerEvent) {
    event.preventDefault();
    this.articlesService.rightClickSubject.next({
      name: "articles",
      coords: {x: event.x, y:event.y},
      data: this.data
    });
  }
}