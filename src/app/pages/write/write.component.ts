import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as MarkdownIt from 'markdown-it';
import * as moment from 'moment';
import { AppService } from 'src/app/services/app.service';

@Component({
  standalone: true,
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  encapsulation: ViewEncapsulation.None
})
export class WriteComponent implements OnInit {

  md = new MarkdownIt();
  title = new FormControl('');

  constructor(private appService: AppService) { }
  
  textContent: string = '';
  
  compiledHTML: string = '';

  user: string = "Alejandro Ríos"

  date: string = ""; 

  ngOnInit(): void {
    moment.locale('es');
    this.date = moment().format('LLLL');
    setTimeout(() => {
      this.date = moment().format('LLLL');
    }, 1000);
  }

  compile(){
    this.compiledHTML = this.md.render(this.textContent);
  }

}