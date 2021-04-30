import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { user } from '../models/user.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient ,private sessionService : SessionService, private router : Router) {}

  update(userdata : user) : Observable<HttpResponse<any>>{
    return this.http.patch<any>('users/' + userdata.id, userdata , { observe : 'response'});
  }
  getImage(id){
    return this.http.get('users/getimage/' + id, { responseType: 'blob' });
  }
  changepassword(user){
    return this.http.post<any>('users/changepassword' , user , { observe : 'response'});
  }
  getusers(){
    return this.http.get<any>('users' , { observe : 'response'});
  }
}
