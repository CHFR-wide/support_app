import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserLoginModel } from '../login/login.model';
import { TokenResponse } from '../token-response.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registerFailedMsg: string = '';

  registerForm!: FormGroup;

  constructor(
    public authService: AuthService,
    private router:Router,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      isModerator: [false],
    })
  }

  onSubmit(){
    this.authService.register(this.registerForm.value)
      .subscribe(
        {
          next: (x: TokenResponse) => {
            this.authService.createsession(x.access_token);
          },
          error: (e) => {
            this.registerFailedMsg = e.error.message;
          },
        }
      )
  }

  doPasswordsMismatch(){
    const vals = this.registerForm.value;
    const pw = vals.password;
    const pwc = vals.passwordConfirm;
    return pw !== pwc;
  }
}
