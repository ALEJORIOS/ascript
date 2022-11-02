import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from './conf';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string){
    this.httpClient.get(`${API}user/login`, {
      params: new HttpParams()
        .set('username', username)
        .set('password', password)
    })
  }

  verifyUsername(username: string){
    return this.httpClient.get(`${API}user/verify-username`, {
      params: new HttpParams().set('username', username)
    })
  }

  verifyEmail(email: string){
    return this.httpClient.get(`${API}user/verify-email`, {
      params: new HttpParams().set('email', email)
    })
  }

  register(userData: any){
    return this.httpClient.post(`${API}user/register`, userData);
  }
  
}
