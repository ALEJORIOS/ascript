import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private baseService: BaseService) { }

  routes: any = [];
  ngOnInit(): void {
    this.getPublicPages();
  }

  getPublicPages(){
    this.baseService.getPublicPages().subscribe({
      next: (res) => this.routes = res,
      error: (err) => console.error(err)
    })
  }

}