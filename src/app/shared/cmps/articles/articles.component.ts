import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  constructor(private baseService: BaseService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.baseService.getTrends(20).subscribe({
      next: (response) => this.docs = response
    })
  }

  getImages() {
    
  }
}