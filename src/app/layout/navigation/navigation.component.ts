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
  loadingPhrase: boolean = false;
  phrase: string = '';

  ngOnInit(): void {
    this.getPublicPages();
    this.getPhrase();
  }

  getPublicPages() {
    this.baseService.getPublicPages().subscribe({
      next: (res) => this.routes = res,
      error: (err) => console.error(err)
    })
  }

  getPhrase() {
    this.loadingPhrase = true;
    this.baseService.getPhrase().subscribe({
      next: (res) => this.phrase = res,
      error: (err) => console.error(err),
      complete: () => this.loadingPhrase = false
    })
  }

}