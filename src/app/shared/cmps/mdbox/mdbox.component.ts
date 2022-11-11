import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import * as MarkdownIt from 'markdown-it';
import { ContentEditableDirective } from 'src/app/directives/content-editable.directive';

@Component({
  standalone: true,
  selector: 'mdbox',
  templateUrl: './mdbox.component.html',
  styleUrls: ['./mdbox.component.scss'],
  imports: [
    FormsModule,
    CommonModule,
    ContentEditableDirective,
    ReactiveFormsModule
  ]
})
export class MdboxComponent implements OnChanges {
  
  @Input('text') content: string = '';
  fieldHeight: any = {};
  contentControl = new FormControl('');

  constructor(private sanitizer: DomSanitizer) { }

  compiledHTML: any;

  md = new MarkdownIt({
    html: true,
    breaks: true
  });

  ngOnChanges(){
    this.contentControl.setValue(this.content);
    this.formatInput();
  }

  compile(){
    let preProccess = this.contentControl.value?.replaceAll('<div>','\n').replaceAll('</div>', '').replaceAll('<br>','\n');
    let compiled = this.md.render(preProccess || '');
    this.compiledHTML = this.sanitizer.bypassSecurityTrustHtml(compiled);
  }

  formatInput(){
    let formattext = this.contentControl.value?.replaceAll('\n', '<br>');
    this.contentControl.setValue(formattext || '');
    this.compile();
  }

}