import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, Observable } from 'rxjs';
import { setEnablePages, setStatusLogged } from '../redux/data.actions';
import { API } from './conf';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  pages$!: Observable<string[]>;
  logged$!: Observable<boolean>; 
  constructor(
    private httpClient: HttpClient,
    private storeAvailablePages: Store<{ availablePages: string[] }>,
    private storeLoggedStatus: Store<{ loggedStatus: boolean }>) { 
    this.pages$ = storeAvailablePages.select('availablePages');
    this.logged$ = storeLoggedStatus.select('loggedStatus');
  }

  setAvailablePages() {
    this.loadingAvailablePages = true;
    const params = new HttpParams().set('username', 'PRUEBAS01');
    this.httpClient.get<any>(`${API}/user/private-pages`, {params}).subscribe({
      next: (res) => {
        this.loadingAvailablePages = false;
        this.storeAvailablePages.dispatch(setEnablePages({pages: res.tabs}))
      }
    });
  }

  getAvailablePages(): Promise<Object> {
    return new Promise((res) => {
      this.pages$.subscribe({
        next: (response) => res(response)
      })
    })
  }

  async getStatusLogged(): Promise<boolean> {
    await this.getTokenVerification();
    return new Promise((res) => {
      this.logged$.subscribe({
        next: (response: any) => res(response.stateLogged)
      })
    })
  }

  getTokenVerification(): Promise<boolean> {
    return new Promise((res) => {
      this.httpClient.get<any>(`${API}/user/verifyToken`).subscribe({
        next: (response) => {
          if( response.code === 1) {
            this.storeLoggedStatus.dispatch(setStatusLogged({stateLogged: true}));
            res(true);
          }else{
            this.logOut();
            res(false);
          }
        }
      })
    })
  }

  logOut() {
    this.storeLoggedStatus.dispatch(setStatusLogged({stateLogged: false}));
    this.storeAvailablePages.dispatch(setEnablePages({pages: []}));
  }

  public loadingAvailablePages: boolean = false;
}