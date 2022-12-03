import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ClickOutsideDirective } from 'src/app/directives/click-outside.directive';
import { PreventRightClickDirective } from 'src/app/directives/prevent-right-click.directive';
import { RightClickSubject } from 'src/app/models/articles.model';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  standalone: true,
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  imports: [CommonModule, ClickOutsideDirective, PreventRightClickDirective]
})
export class DropdownComponent implements OnInit {

  constructor(private articlesService: ArticlesService) {}

  showDropdown = {
    articles: false
  }
  locateBox: any = {}

  ngOnInit(): void {
    this.articlesService.rightClickSubject.subscribe({
      next: (obj: RightClickSubject) => this.processData(obj)
    })
    
    console.log("Ubicacion: ", this.locateBox)
  }

  processData(obj: RightClickSubject) {
    if(obj.name === "articles") {
      this.locateBox = {
        "left": obj.coords.x+"px",
        "top": obj.coords.y+"px"
      }
      this.showDropdown.articles = true;
    }
  }

  showHideBox(event: any) {
    if(event.left === true) this.showDropdown.articles = false;
    if(event.right === true && !this.showDropdown.articles) this.showDropdown.articles = false;
  }
}
