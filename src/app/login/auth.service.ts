import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { Response, Http, Headers } from '@angular/http';

const BASEURL = 'http://localhost:3000/api';

@Injectable()
export class AuthService {
  constructor(private http: Http) {}

  login(body) {
    return this.http.post(`${environment.BASEURL}/Users/login`, body.credentials).map(
      (response: Response) => {
        let res = response.json();
        return res;
      }
    );
  }

  persist(prop: string, value: any) {
    sessionStorage.setItem(prop, value);
  }

  checkToken(): boolean {
    return this.loadFromSession() ? true : false;
  }

  loadFromSession() {
    return sessionStorage.getItem('ACCESS_TOKEN');
  }

  removeAccessToken() {
    sessionStorage.removeItem('ACCESS_TOKEN');
  }

  logout() {
    let headers = new Headers();
    headers.append('Authorization', this.loadFromSession());
    return this.http.post(`${environment.BASEURL}/Users/logout`, null, {headers: headers}).map(
      (response: Response) => {
        let res = response.json();
        this.removeAccessToken();
        return res;
      }
    );
  }

}
