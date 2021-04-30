import { HttpClient } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { userLoginModel, userLoginModelResponse, userRegistrationModel, userRegistrationModelResponse } from '../models/user.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http : HttpClient ,private sessionService : SessionService, private router : Router) {}

  login(userdata : userLoginModel) : Observable<HttpResponse<userLoginModelResponse>>{
    return this.http.post<userLoginModelResponse>('auth/login', userdata , { observe : 'response'});
  }
  register(userdata : userRegistrationModel) : Observable<HttpResponse<userRegistrationModelResponse>>{
    return this.http.post<userRegistrationModelResponse>('auth/register', userdata , { observe : 'response'});
  }
  logout(){
    localStorage.clear();
    this.sessionService.setuser(true);
    this.router.navigate(['']);
  }
}
