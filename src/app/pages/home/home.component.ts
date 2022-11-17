import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticlesComponent } from 'src/app/shared/cmps/articles/articles.component';
import { LateralRightComponent } from 'src/app/shared/cmps/lateral-right/lateral-right.component';

@Component({
  standalone: true,
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    ArticlesComponent, 
    LateralRightComponent,
    CommonModule]
})
export class HomeComponent implements OnInit {

  logged: any;
  pages$!: Observable<any>;
  constructor() {}

  ngOnInit(): void {}
}