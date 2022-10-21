import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'lateral-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor() { }
  @Input('data') data: any;

  ngOnInit(): void {
  }

}
