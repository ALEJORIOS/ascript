import { API } from './conf';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private httpClient: HttpClient) { }

  getTrends(take: number = 5){
    return this.httpClient.get(`${API}docs/preview-trends?take=${take}`);
  }

  getArticle(seqCode: string){
    return this.httpClient.get(`${API}docs/read?seq=${seqCode}`);
  }
}
