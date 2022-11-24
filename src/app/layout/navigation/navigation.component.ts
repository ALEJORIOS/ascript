import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { BaseService } from 'src/app/services/base.service';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private baseService: BaseService, private appService: AppService) { }

  routes: any = [];
  loadingPhrase: boolean = false;
  phrase: string = '';

  ngOnInit(): void {
    this.getPublicNavPages();
    this.getPhrase();
  }

  getPublicNavPages() {
    this.baseService.getPublicNavPages().subscribe({
      next: async (res) => {
        this.routes = res;
        await this.appService.getStatuslogged().then(response => {
          if(response) {
            const loginIndex = this.routes.findIndex((route: any) => route.name === "Login");
            this.routes.splice(loginIndex, 1);
          }
        })
      },
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