import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'
import { HttpLoginResponse } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(
    public authService: AuthService,
    private router:Router,
    ) {}

  onLogin(form: NgForm){
    const vals = form.value;
    this.authService.login(vals.username, vals.password)
      .subscribe(
        (x: HttpLoginResponse) => {
          localStorage.setItem('id_token', x.access_token);
          this.router.navigateByUrl('/');
        }
      )
  }

  onLogOut(){
    alert("logout");
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
