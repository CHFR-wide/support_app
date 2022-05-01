import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserLoginModel } from './login/login.model';
import { Router } from '@angular/router';
import { userRegisterModel } from './register/register.model';
import { TokenResponse } from './token-response.model';

@Injectable({providedIn: 'root'})
export class AuthService {
  private loginUrl = `${environment.apiUrl}auth/login`
  private registerUrl = `${environment.apiUrl}auth/register`

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

  login(UserLoginModel: UserLoginModel) {
    return this.http.post<TokenResponse>(this.loginUrl, UserLoginModel);
  }

  register(userRegisterModel: userRegisterModel) {
    console.log(userRegisterModel);
    return this.http.post<TokenResponse>(this.registerUrl, userRegisterModel);
  }

  logout(){
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
    this.router.navigateByUrl('/');
  }

  getUsername(){
    return this.decodeToken(localStorage.getItem('id_token')!).username;
  }

  isUserModerator(){
    return this.decodeToken(localStorage.getItem('id_token')!).isModerator;
  }
}
