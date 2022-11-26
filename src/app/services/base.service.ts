import { API } from './conf';
// import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

  getNavPages() {
    return this.httpClient.get(`${API}/nav-pages`);
  }

  getPublicNavPages() {
    return this.httpClient.get(`${API}/user/nav-public`);
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

  postImage(formData: FormData) {
    return this.httpClient.post(`${API}/docs/upload-img`, formData);
  }

  getImage() {
    return this.httpClient.get<any>(`${API}/docs/download-img`);
  }

  getSeq() {
    return this.httpClient.get(`${API}/docs/seq`);
  }

  getCurrentSeq() {
    return this.httpClient.get<number>(`${API}/docs/current-seq`);
  }

  getEnablePages(){
    return this.httpClient.get(`${API}/enable-pages`);
  }
}