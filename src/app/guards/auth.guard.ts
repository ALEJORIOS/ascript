import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of, take } from 'rxjs';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private appService: AppService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    this.appService.setAvailablePages();
    const currentPage = state.url;
    return new Promise(res => {
      this.appService.loadingAvailablePages.subscribe({
        next: (isLoading) => {
          if(!isLoading) {
            this.appService.getStatuslogged().then(status => {
              if(status) {
                if(this.appService.getAvailablePages().includes(currentPage)) {
                  res(true);
                } else {
                  this.router.navigate(['account/login']);
                  res(false);
                }
              } else {
                this.router.navigate(['account/login']);
                res(false);
              }
            })
          }
        }
      })
    })
  }
}