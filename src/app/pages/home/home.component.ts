import { Component, OnInit } from '@angular/core';
import { ArticlesComponent } from 'src/app/shared/cmps/articles/articles.component';
import { LateralRightComponent } from 'src/app/shared/cmps/lateral-right/lateral-right.component';

@Component({
  standalone: true,
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [ArticlesComponent, LateralRightComponent]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
