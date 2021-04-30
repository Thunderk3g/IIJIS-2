import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { userLoginModelResponse } from '../models/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private toastr: ToastrService, private authenticationService : AuthenticationService, private sessionservice : SessionService)
  { }

  ngOnInit(): void {
    if(localStorage.getItem('userdata') !== null)
      this.router.navigate(['']);
    this.initForm();
  }
  validateAndLogin(){
    if(this.loginForm.controls['username'].invalid){
      this.toastr.error('Username must Be provided!', 'Validation Error!');
    }
    else if(this.loginForm.controls['password'].invalid){
      this.toastr.error('Password must be provided!', 'Validation Error!');
    }
    else{
      // CALL REGISTER API
      this.authenticationService.login({
        email : this.loginForm.controls['username'].value,
        password : this.loginForm.controls['password'].value,
      }).subscribe((data) => {
        this.toastr.success('Logged In!', 'Success!');
        this.setLocalStorage(data.body).then((resolve) => {
          if(resolve)
          this.router.navigate(['']);
        });
      }, (err) => {
        this.toastr.error(err, 'Error!');
      });
    }
  }
  initForm(){
    this.loginForm = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      remember: new FormControl('', [Validators.required]),
    });
  }
  setLocalStorage(data : userLoginModelResponse){
    return new Promise((resolve) => {
      localStorage.setItem('accesstoken', data.tokens.access.token);
      localStorage.setItem('refreshtoken', data.tokens.refresh.token);
      localStorage.setItem('userdata', JSON.stringify(data.user));
      this.sessionservice.setuser(true);
      resolve(true);
    })
  }
}
