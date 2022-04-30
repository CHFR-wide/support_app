import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpLoginResponse } from './login/login.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  private loginUrl = `${environment.apiUrl}auth/login`

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<HttpLoginResponse>(this.loginUrl, { username, password });
  }

  logout(){
    localStorage.removeItem('id_token');
  }

  public isLoggedIn(){
    const token = localStorage.getItem('id_token');
    if (token === null) return false;
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return (Math.floor(Date.now()/1000) < expiry);
  }

  isLoggedOut(){
    return !this.isLoggedIn();
  }
}
