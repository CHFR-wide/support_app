import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    public authService: AuthService,
    private router:Router,
    ) {}

  onRegister(form: NgForm){

  }

  doPasswordsMismatch(form: NgForm){
    const vals = form.value;
    const pw = vals.password;
    const pwc = vals.passwordConfirm;
    return pw !== pwc;
  }
}
