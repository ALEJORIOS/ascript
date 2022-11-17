import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { State, Store } from '@ngrx/store';
import { map, Observable, of, take } from 'rxjs';
import { AppService } from '../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  pages$: Observable<Array<string>>;
  constructor(private appService: AppService,
    private store: Store<{ availablePages: any }>) { 
      this.pages$ = store.select('availablePages').pipe(map(elem => elem.prop));
    }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    console.log('verificando');
    return new Promise((res) => {
      this.pages$.subscribe({
        next: (availableArray: Array<string>) => {
          if(!this.appService.loadingAvailablePages){
            if(availableArray?.includes(state.url)){
              res(true);
            }else{
              res(false);
            }
          }
        }
      });
    })
  } 
}