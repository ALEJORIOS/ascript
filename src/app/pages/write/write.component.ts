import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as MarkdownIt from 'markdown-it';
import * as moment from 'moment';
import { switchMap } from 'rxjs';
import { ContentEditableDirective } from 'src/app/directives/content-editable.directive';
import { AppService } from 'src/app/services/app.service';
import { BaseService } from 'src/app/services/base.service';
import { MdboxComponent } from 'src/app/shared/cmps/mdbox/mdbox.component';
import { JwtHelperService } from "@auth0/angular-jwt";

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

  compiledHTML!: SafeHtml;

  user: string = "";

  username: string = "";

  date: string = ""; 

  constructor(
    private appService: AppService, 
    private sanitizer: DomSanitizer,
    private baseService: BaseService) { }
  
  ngOnInit(): void {
    this.getUsername();
    moment.locale('es');
    this.date = moment().format('LLLL');
    setTimeout(() => {
      this.date = moment().format('LLLL');
    }, 1000);
  }

  getUsername(){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(sessionStorage.getItem('jwt') || '');
    this.user = decodedToken.name;
    this.username = decodedToken.username;
  }

  compileText(){
    let preProccess = this.contentBody.value?.replaceAll('<div>','\n').replaceAll('</div>', '').replaceAll('<br>','\n').replaceAll('~', '');
    let compiled = this.md.render(preProccess || '');
    this.compiledHTML = this.sanitizer.bypassSecurityTrustHtml(compiled);
  }

  save() {
    this.baseService.getSeq()
    .pipe(switchMap(seq => this.baseService.postSaveDoc({name: this.title.value, author: this.username, date: moment(), content: this.contentBody.value, seq})))
    .subscribe(res => console.log(res));
  }

  publish() {
    console.log(this.username);
    this.baseService.getSeq()
    .pipe(switchMap(seq => this.baseService.postPublishDoc({name: this.title.value, author: this.username, date: moment(), content: this.contentBody.value, seq})))
    .subscribe(res => console.log(res));
  }
}