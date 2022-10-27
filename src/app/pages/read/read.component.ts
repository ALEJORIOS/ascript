import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { BaseService } from 'src/app/services/base.service';
import * as MarkdownIt from 'markdown-it';

@Component({
  standalone: true,
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
  imports: [PipesModule]
})
export class ReadComponent implements OnInit {

  data: any = {};
  description: string = "";
  content: string = "";
  md = new MarkdownIt();
  constructor(route: ActivatedRoute, baseService: BaseService) {
    let seq = route.snapshot.paramMap.get('doc');
    if (seq) {
      baseService.getArticle(seq).subscribe({
        next: (res) => this.compileMD(res),
        error: (err) => console.error(err)
      });
    }

  }

  ngOnInit(): void {
  }

  compileMD(data: any){
    this.data = data;
    this.description = this.md.render(this.data.description);
    this.content = this.md.render(this.data.content);
  }

  formatDate(date: string): string{
    return moment(date).format('LLLL')
  }

}
