import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AdminService {

  constructor(private _http: HttpClient) { }
  // register admin service
  //  register(body: any) {
  //   return this._http.post('http://127.0.0.1:3000/admin/register', body, {
  //     observe: 'body',
  //     headers: new HttpHeaders().append('Content-Type', 'application/json')
  //   });
  // }
  // login service
  login(body: any) {
    return this._http.post('http://127.0.0.1:3000/admin/login', body , {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  // admin dashboard service
  dashboard() {
    return this._http.get('http://127.0.0.1:3000/admin/dashboard', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  // logout service
  logout() {
    return this._http.get('http://127.0.0.1:3000/admin/logout', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  send(body: any) {
    return this._http.post('http://127.0.0.1:3000/admin/message', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  subcribe(body: any) {
    return this._http.post('http://127.0.0.1:3000/admin/subcribe', body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
  getImage() {
    return this._http.get('http://127.0.0.1:3000/admin/image', {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }
}
