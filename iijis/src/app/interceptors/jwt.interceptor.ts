import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from 'src/config/config';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private config : config) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      // add auth header with jwt if user is logged in and request is to api url
      const currentUser = JSON.parse(localStorage.getItem('userdata'));
      const token = localStorage.getItem('accesstoken');
      const isLoggedIn = currentUser && token;
      const isApiUrl = request.url.startsWith(this.config.apiPath);
      if (isLoggedIn && isApiUrl) {
          request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${token}`
              }
          });
      }
      return next.handle(request);
  }
}
