import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from '../../config/config';

@Injectable()
export class Urlnterceptor implements HttpInterceptor {

  constructor(private config : config) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newrequest = request.clone({
      url : this.config.apiPath + request.url,
    });
    return next.handle(newrequest);
  }
}
