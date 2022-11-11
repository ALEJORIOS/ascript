import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as MarkdownIt from 'markdown-it';

@Component({
  standalone: true,
  selector: 'mdbox',
  templateUrl: './mdbox.component.html',
  styleUrls: ['./mdbox.component.scss'],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class MdboxComponent implements AfterViewInit {
  
  // @Input('text') content: string = '';
  @ViewChild('field') field!: ElementRef;
  fieldHeight: any = {};
  constructor() { }

  compiledHTML: string = '';
  
  content: string = '';

  md = new MarkdownIt({
    html: true,
    breaks: true
  });

  ngAfterViewInit(){
    this.compile();
  }

  compile(){
    this.compiledHTML = this.md.render(this.content);
    this.fieldHeight.height = 'fit-content';
    this.fieldHeight.height = `${(this.field.nativeElement as HTMLElement).scrollHeight}px`;
    console.log(this.fieldHeight);
  }

}