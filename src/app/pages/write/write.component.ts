import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as MarkdownIt from 'markdown-it';
import * as moment from 'moment';
import { ContentEditableDirective } from 'src/app/directives/content-editable.directive';
import { AppService } from 'src/app/services/app.service';
import { MdboxComponent } from 'src/app/shared/cmps/mdbox/mdbox.component';

@Component({
  standalone: true,
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentEditableDirective,
    MdboxComponent
  ],
  encapsulation: ViewEncapsulation.None
})
export class WriteComponent implements OnInit {

  md = new MarkdownIt({
    html: true,
    breaks: true
  });

  title = new FormControl('');

  contentBody = new FormControl('');

  compiledHTML: string = '';

  user: string = "Alejandro Ríos"

  date: string = ""; 

  constructor(private appService: AppService) { }
  

  ngOnInit(): void {
    moment.locale('es');
    this.date = moment().format('LLLL');
    setTimeout(() => {
      this.date = moment().format('LLLL');
    }, 1000);
  }

  compileText(){
    let preProccessArray = this.contentBody.value?.replace(new RegExp('&nbsp;', 'g'),' ').split('');
    preProccessArray?.splice(Math.min(140, preProccessArray.length), 0, '</span>');
    preProccessArray?.splice(0, 0, "<span class='introduction'>");
    let preProccessString = preProccessArray?.join('') || '';
    this.compiledHTML = this.md.render(preProccessString);
  }

}