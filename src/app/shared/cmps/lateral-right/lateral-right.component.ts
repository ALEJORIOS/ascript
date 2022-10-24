import { BaseService } from './../../../services/base.service';
import { Component, OnInit } from '@angular/core';
import { ArticleComponent } from './article/article.component';

@Component({
  standalone: true,
  selector: 'lateral',
  templateUrl: './lateral-right.component.html',
  styleUrls: ['./lateral-right.component.scss'],
  imports: [ArticleComponent]
})
export class LateralRightComponent implements OnInit {


  prueba = {
    "_id":{"$oid":"635316b92d8db8fbc80f2988"},
    "name": "Documento de prueba",
    "author": "Alejandro Ríos",
    "creation_date": "10-21-2022",
    "views": 1234,
    "content": "Hola mundo este es el contenido"
  }

  constructor(private baseService: BaseService) { }

  ngOnInit(): void {
    this.getTrends();
  }

  getTrends(){
    this.baseService.getTrends().subscribe(res => {
      console.log(res);
    });
  }

}
