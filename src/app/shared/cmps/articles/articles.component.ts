import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RightClickDirective } from 'src/app/directives/right-click.directive';
import { ArticlesService } from 'src/app/services/articles.service';
import { BaseService } from 'src/app/services/base.service';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  standalone: true,
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  imports: [CommonModule, RightClickDirective, DropdownComponent]
})
export class ArticlesComponent implements OnInit {  

  docs: Array<any> = [];
  showCopyNot: boolean = false;
  constructor(private baseService: BaseService, private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.baseService.getTrends(20)
    .subscribe({
      next: (response: any) => {
        this.docs = this.articlesService.prepareObject(response);
        console.log('res: ', this.docs);
      }
    })
  }

  copyCode(doc: any) {
    navigator.clipboard.writeText(doc.seq.toString());
    doc.showCopyNot = true;
    setTimeout(() => {
      doc.showCopyNot = false;
    }, 1000);
  }


}