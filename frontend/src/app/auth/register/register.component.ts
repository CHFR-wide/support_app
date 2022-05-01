import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpLoginResponse } from '../login/login.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerFailedMsg: string = '';

  constructor(
    public authService: AuthService,
    private router:Router,
    ) {}

  onRegister(form: NgForm){
    const vals = form.value;
    this.authService.register(vals.username, vals.password, vals.passwordConfirm)
      .subscribe(
        {
          next: (x: HttpLoginResponse) => {
            this.authService.createsession(x.access_token);
          },
          error: (e) => {
            this.registerFailedMsg = e.error.message;
          },
        }
      )
  }

  doPasswordsMismatch(form: NgForm){
    const vals = form.value;
    const pw = vals.password;
    const pwc = vals.passwordConfirm;
    return pw !== pwc;
  }
}
