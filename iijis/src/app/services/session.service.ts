import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public user = new Subject<any>();

  constructor() { }

  setuser(event: any) {
    this.user.next(event);
  }
  get setuserevent$() {
    return this.user.asObservable();
  }
}
