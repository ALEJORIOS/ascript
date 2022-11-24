import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { API } from './conf';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private httpClient: HttpClient, protected variables: variables) { }

  setAvailablePages() {
    this.loadingAvailablePages.next(true);
    this.httpClient.get<any>(`${API}/user/private-pages`).subscribe({
      next: (res) => {
        this.variables.availablePages = res;
      },
      complete: () => {
        this.loadingAvailablePages.next(false);
      }
    });
  }

  getAvailablePages(): Array<Object> {
    return this.variables.availablePages;
  }

  getStatuslogged(): Promise<boolean> {
    return new Promise((res) => {
      this.httpClient.get<any>(`${API}/user/verifyToken`).subscribe({
        next: (response) => {
          if( response.code === 1) {
            this.variables.isLogged = true;
            res(true);
          }else{
            this.logOut();
            res(false);
          }
        },
        error: (err) => console.error(err)
      })
    })
  }

  logOut() {
    this.variables.availablePages = [];
    this.variables.isLogged = false;
  }

  public loadingAvailablePages = new BehaviorSubject(false);
}

@Injectable({
  providedIn: 'root'
})
export class variables {

  private loggedStatus: boolean = false;
  private availablePagesList: Array<string> = [];

  public get isLogged() {
    return this.loggedStatus;
  }

  public set isLogged(status: boolean) {
    this.loggedStatus = status;
  }

  public get availablePages() {
    return this.availablePagesList;
  }

  public set availablePages(newPages: Array<string>) {
    this.availablePagesList = newPages;
  }
}