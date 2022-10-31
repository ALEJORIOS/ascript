import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { BaseService } from 'src/app/services/base.service';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from 'src/app/shared/cmps/spinner/spinner.component';
import * as moment from 'moment';
import * as MarkdownIt from 'markdown-it';

@Component({
  standalone: true,
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
  imports: [PipesModule, CommonModule, SpinnerComponent]
})
export class ReadComponent implements OnInit {

  largeNumber: any = {
    home: false,
    normal: false,
    large: false,
    extraLarge: false
  }
  trend: any = [];
  sequence: number = 0;
  data: any = {};
  description: string = "";
  content: string = "";
  md = new MarkdownIt();
  constructor(route: ActivatedRoute, private baseService: BaseService) {
    this.sequence = parseInt(route.snapshot.paramMap.get('doc') || "0");
    console.log(this.sequence);
    if(this.sequence === 0){
      this.setLargeNumber('home');
    }else{
      baseService.getArticle(this.sequence).subscribe({
        next: (res) => this.compileMD(res),
        error: (err) => console.error(err)
      });
    }

  }

  ngOnInit(): void {
    this.getTrend();
  }

  compileMD(data: any){
    if(this.sequence >= 1000000000){
      this.setLargeNumber('extraLarge');
    }else if(this.sequence >= 2 && this.sequence < 1000000000){
      this.setLargeNumber('large');
    }else{
      this.setLargeNumber('normal');
      this.data = data;
      this.description = this.md.render(this.data.description);
      this.content = this.md.render(this.data.content);
    }
  }

  formatDate(date: string): string{
    return moment(date).format('LLLL')
  }

  setLargeNumber(key: string){
    Object.keys(this.largeNumber).forEach(key => {
      this.largeNumber[key] = false;
    });
    this.largeNumber[key] = true;
  }

  getTrend(){
    this.baseService.getTrends().subscribe({
      next: (res) => this.trend = res,
      error: (err) => console.error(err)
    })
  }

}