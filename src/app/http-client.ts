import { Injectable } from '@angular/core';
import { AuthService } from './login/auth.service';
import { Http, Headers } from '@angular/http';

@Injectable()
export class HttpClient {

  constructor(private http: Http, private authService: AuthService) {}

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', this.authService.loadFromSession());
  }

  get(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url, {
      headers: headers
    });
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }

  patch(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.patch(url, data, {
      headers: headers
    });
  }

  delete(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers: headers
    });
  }

  put(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(url, data, {
      headers: headers
    });
  }
}
