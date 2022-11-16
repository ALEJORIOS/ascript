import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, Observable } from 'rxjs';
import { setEnablePages } from '../redux/data.actions';
import { API } from './conf';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  pages$!: Observable<string[]>;
  constructor(
    private httpClient: HttpClient,
    private store: Store<{ availablePages: string[] }>) { 
    this.pages$ = store.select('availablePages');
  }

  setAvailablePages() {
    const params = new HttpParams().set('username', 'PRUEBAS01');
    this.httpClient.get<any>(`${API}/user/private-pages`, {params}).subscribe({
      next: (res) => {
        this.store.dispatch(setEnablePages({pages: res.tabs}))
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
}