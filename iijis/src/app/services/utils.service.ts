import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http : HttpClient) {}

  public getCountries() : Observable<HttpResponse<any>>{
    return this.http.get<any>('utils/countries' , { observe : 'response'});
  }
}
