import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { userRegistrationModelResponse } from '../models/user.model';
import { AuthenticationService } from '../services/authentication.service';
import { SessionService } from '../services/session.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm : FormGroup;
  countries: any;
  constructor(private utilsService : UtilsService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private authenticationService : AuthenticationService, private sessionservice : SessionService) { }

  ngOnInit(): void {
    if(localStorage.getItem('userdata') !== null)
      this.router.navigate(['']);
    this.initForm();
  }
  validateAndRegister(){
    if(this.registerForm.controls['firstName'].invalid){
      this.toastr.error('First Name must Be provided!', 'Validation Error!');
    }
    else if(this.registerForm.controls['lastName'].invalid){
      this.toastr.error('Last Name must Be provided!', 'Validation Error!');
    }
    else if(this.registerForm.controls['affiliation'].invalid){
      this.toastr.error('Affiliation must be provided!', 'Validation Error!');
    }
    else if(this.registerForm.controls['country'].invalid){
      this.toastr.error('Country must be provided!', 'Validation Error!');
    }
    else if(this.registerForm.controls['email'].invalid){
      this.toastr.error('Email doesn\'t appear to be valid!', 'Validation Error!');
    }
    else if(this.registerForm.controls['phone'].invalid){
      this.toastr.error('Phone Number is invalid!', 'Validation Error!');
    }
    else if(this.registerForm.controls['password'].invalid){
      this.toastr.error('Password must be entered and have at least 8 characters!', 'Validation Error!');
    }
    else if(this.registerForm.controls['confirmPassword'].invalid){
      this.toastr.error('Confirm Password must be entered and have at least 8 characters!', 'Validation Error!');
    }
    else if(this.registerForm.controls['confirmPassword'].value !== this.registerForm.controls['password'].value){
      this.toastr.error('Passwords do not match', 'Validation Error!');
    }
    else if(this.registerForm.controls['agree'].value === '' || this.registerForm.controls['agree'].value === false){
      this.toastr.error('Please agree to our Terms and Conditions!', 'Validation Error!');
    }
    else{
      // CALL REGISTER API
      this.authenticationService.register({
        firstName : this.registerForm.controls['firstName'].value,
        lastName : this.registerForm.controls['lastName'].value,
        affiliation : this.registerForm.controls['affiliation'].value,
        country : this.registerForm.controls['country'].value,
        email : this.registerForm.controls['email'].value,
        phone : this.registerForm.controls['phone'].value,
        password : this.registerForm.controls['password'].value,
        confirmPassword : this.registerForm.controls['confirmPassword'].value
      }).subscribe((data) => {
        this.toastr.success('Successfully Registered User!', 'Success!');
        this.setLocalStorage(data.body).then((resolve) => {
          if(resolve)
          this.router.navigate(['']);
        });
      }, (err) => {
        this.toastr.error(err.error.message, 'Validation Error!');
      });
    }
  }
  initForm(){
    this.registerForm = this.fb.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      affiliation: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      agree: new FormControl('', [Validators.required]),
    });
    this.utilsService.getCountries().subscribe((data) => { this.countries = data.body.countries });
  }
  setLocalStorage(data : userRegistrationModelResponse){
    return new Promise((resolve) => {
      localStorage.setItem('accesstoken', data.tokens.access.token);
      localStorage.setItem('refreshtoken', data.tokens.refresh.token);
      localStorage.setItem('userdata', JSON.stringify(data.user));
      this.sessionservice.setuser(true);
      resolve(true);
    });
  }

}
