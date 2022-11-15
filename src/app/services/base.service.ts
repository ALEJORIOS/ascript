import { API } from './conf';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private httpClient: HttpClient) { }

  getTrends(take: number = 5) {
    const params = new HttpParams().set('take', take);
    return this.httpClient.get(`${API}/docs/preview-trends`, {params});
  }

  getArticle(seqCode: number) {
    return this.httpClient.get(`${API}/docs/read?seq=${seqCode}`);
  }

  getPublicPages() {
    return this.httpClient.get(`${API}/public-pages`);
  }

  getPhrase() {
    return this.httpClient.get<string>(`${API}/phrase`);
  }

  postSaveDoc(body: any) {
    return this.httpClient.post(`${API}/docs/save-doc`, body);
  }

  postPublishDoc(body: any) {
    return this.httpClient.post(`${API}/docs/publish-doc`, body);
  }

  getSeq() {
    return this.httpClient.get(`${API}/docs/seq`);
  }

}
