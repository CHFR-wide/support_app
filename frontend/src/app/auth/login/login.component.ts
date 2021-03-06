import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'
import { TokenResponse } from '../token-response.model';
import { UserLoginModel } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginFailedMsg:string = ''

  loginForm!: FormGroup;

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router:Router,
  ) {};

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  onSubmit(){
    this.authService.login(this.loginForm.value)
      .subscribe(
        {
          next: (x: TokenResponse) => {
            this.authService.createsession(x.access_token);
          },
          error: (e) => {
            this.loginFailedMsg = "Login échoué.";
          },
        }
      )
  }
}
