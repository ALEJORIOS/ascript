import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { API } from './conf';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private httpClient: HttpClient, protected variables: variables) { }

  setAvailablePages() {
    this.loadingAvailablePages = true;
    const params = new HttpParams().set('username', 'PRUEBAS01');
    this.httpClient.get<any>(`${API}/user/private-pages`, {params}).subscribe({
      next: (res) => {
        this.variables.availablePages = res;
      },
      complete: () => {
        this.loadingAvailablePages = false;
      }
    });
  }

  getAvailablePages(): Array<Object> {
    return this.variables.availablePages;
  }

  async getStatusLogged(): Promise<boolean> {
    await this.getTokenVerification();
    return new Promise((res) => {

    })
  }

  getTokenVerification(): Promise<boolean> {
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
        }
      })
    })
  }

  logOut() {
    this.variables.availablePages = [];
    this.variables.isLogged = false;
  }

  public loadingAvailablePages: boolean = false;
}

export class variables {

  private loggedStatus: boolean = false;
  private availablePagesList: Array<any> = [];

  public get isLogged() {
    return this.loggedStatus;
  }

  public set isLogged(status: boolean) {
    this.loggedStatus = status;
  }

  public get availablePages() {
    return this.availablePagesList;
  }

  public set availablePages(newPages: Array<any>) {
    this.availablePages = newPages;
  }
}