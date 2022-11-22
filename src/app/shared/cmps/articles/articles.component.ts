import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  standalone: true,
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  show() {
    console.log(this.appService.getAvailablePages());
  }

}