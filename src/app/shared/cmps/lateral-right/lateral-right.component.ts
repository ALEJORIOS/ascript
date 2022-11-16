import { BaseService } from './../../../services/base.service';
import { Component, OnInit } from '@angular/core';
import { ArticleComponent } from './article/article.component';
import { AppService } from 'src/app/services/app.service';

@Component({
  standalone: true,
  selector: 'lateral',
  templateUrl: './lateral-right.component.html',
  styleUrls: ['./lateral-right.component.scss'],
  imports: [ArticleComponent]
})
export class LateralRightComponent implements OnInit {

  trend: any;

  constructor(
    private baseService: BaseService,
    private appService: AppService) { }

  ngOnInit(): void {
    this.getTrends();
  }

  getTrends(){
    this.baseService.getTrends().subscribe(res => {
      this.trend = res;
    });
  }

}
