import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpLoginResponse } from '../login/login.model';

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
    })
  }

  onSubmit(){
    const vals = this.registerForm.value;
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

  doPasswordsMismatch(){
    const vals = this.registerForm.value;
    const pw = vals.password;
    const pwc = vals.passwordConfirm;
    return pw !== pwc;
  }
}
