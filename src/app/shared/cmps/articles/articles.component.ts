import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ArticlesService } from 'src/app/services/articles.service';
import { BaseService } from 'src/app/services/base.service';

@Component({
  standalone: true,
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  imports: [CommonModule]
})
export class ArticlesComponent implements OnInit {  

  docs: Array<any> = [];
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

  getImages() {
    
  }
}