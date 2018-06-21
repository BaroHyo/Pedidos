import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class Api {
 // url: string = 'http://localhost:8080/api';
  url: string = 'http://mundolibre-001-site1.htempurl.com/api';
  constructor(public http: HttpClient) {
  }
  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }
    
    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }
  post(endpoint: string, body: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/javascript'
    });
    return this.http.post(this.url + '/' + endpoint, body,{headers});
  }
  put(endpoint: string, body: any ) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/javascript'
    });
    return this.http.put(this.url + '/' + endpoint, body, {headers});
  }
  delete(endpoint: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/javascript'
    });
    return this.http.delete(this.url + '/' + endpoint, {headers});
  }
  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }
}
