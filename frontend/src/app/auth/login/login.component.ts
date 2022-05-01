import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from '../auth.service'
import { HttpLoginResponse } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  loginFailedMsg:string = ''

  constructor(
    public authService: AuthService,
    private router:Router,
    ) {}

  onLogin(form: NgForm){
    const vals = form.value;
    this.authService.login(vals.username, vals.password)
      .subscribe(
        {
          next: (x: HttpLoginResponse) => {
            this.authService.createsession(x.access_token);
          },
          error: (e) => {
            this.loginFailedMsg = "Login échoué.";
          },
        }
      )
  }
}
