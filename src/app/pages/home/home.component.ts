import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setEnablePages } from 'src/app/redux/data.actions';
import { AppService } from 'src/app/services/app.service';
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
  constructor(private appService: AppService,
    private store: Store<{ availablePages: any }>) { 
      this.pages$ = store.select('availablePages');
    }

  ngOnInit(): void {}

  show() {
    this.pages$.subscribe(res => {
      console.log(res);
    })
  }

  set() {
    let obj = {pages: ['primera', 'segunda']};
    this.store.dispatch(setEnablePages(obj))
  }
}
