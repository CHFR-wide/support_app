import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpLoginResponse } from './login/login.model';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
  private loginUrl = `${environment.apiUrl}auth/login`
  private registerUrl = `${environment.apiUrl}auth/register`

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  login(username: string, password: string) {
    return this.http.post<HttpLoginResponse>(this.loginUrl, { username, password });
  }

  register(username: string, password: string, passwordConfirm: string) {
    return this.http.post<HttpLoginResponse>(this.registerUrl, { username, password, passwordConfirm });
  }

  logout(){
    localStorage.removeItem('username');
    localStorage.removeItem('id_token');
  }

  public isLoggedIn(){
    const token = localStorage.getItem('id_token');
    if (token === null) return false;
    const expiry = this.decodeToken(token).exp;
    return (Math.floor(Date.now()/1000) < expiry);
  }

  public decodeToken(token: string){
    return JSON.parse(atob(token.split('.')[1]))
  }

  public createsession(token: string){
    localStorage.setItem('id_token', token);
    localStorage.setItem('username', this.decodeToken(token).username);
    this.router.navigateByUrl('/');
  }

  isLoggedOut(){
    return !this.isLoggedIn();
  }

}
