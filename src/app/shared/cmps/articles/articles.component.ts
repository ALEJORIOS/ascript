import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AppService } from 'src/app/services/app.service';
import { BaseService } from 'src/app/services/base.service';

@Component({
  standalone: true,
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  imports: [CommonModule]
})
export class ArticlesComponent implements OnInit {

  urlLink: SafeUrl = "";
  showImg: boolean = false;

  constructor(
    private appService: AppService, 
    private baseService: BaseService,
    private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {}

  show() {
    this.appService.getStatuslogged().then(res => {
      console.log('Estado de logueo: ',res);
    });
    console.log('Páginas disponibles: ', this.appService.getAvailablePages());
  }

  uploadImg(event: any) {
    const FILES = event.target.files;
    const IMG_FORM_DATA = new FormData();
    console.log('Archivos: ', FILES);
    IMG_FORM_DATA.append('file', FILES[0]);
    this.baseService.postImage(IMG_FORM_DATA).subscribe(res => {
      console.log('>>>', res);
    })
  }

  downloadImg() {
    this.baseService.getImage().subscribe( res => {
      this.urlLink = 'data:image/jpg;base64, '+res.data;
      console.log('>>>', this.urlLink);
      this.showImg = true;
    })
  }
}