import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { initSubmissionModel } from '../models/submission.model';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  constructor(private http : HttpClient) { }

  initsubmission(submission: initSubmissionModel) : Observable<HttpResponse<any>>{
    return this.http.post<any>('submission/init', submission , { observe : 'response'});
  }
  incompletesubmission(id: string) : Observable<HttpResponse<any>>{
    return this.http.get<any>('submission/incomplete/' + id , { observe : 'response'});
  }
  uploadsubmissionimage(file : File, user : string): Observable<HttpResponse<any>>{
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('user', user);
    return this.http.post<any>('submission/profile', formData, { observe : 'response' });
  }
  uploadsubmissiondoc(file : File, user : string): Observable<HttpResponse<any>>{
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('user', user);
    return this.http.post<any>('submission/document', formData, { observe : 'response' });
  }
  uploadreleaseimage(file : File): Observable<HttpResponse<any>>{
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>('submission/uploadimage', formData, { observe : 'response' });
  }
  getfile(id): Observable<HttpResponse<any>>{
    return this.http.get<any>('submission/file/' + id, { observe : 'response' });
  }
  completedocumentation(submission): Observable<HttpResponse<any>>{
    return this.http.put<any>('submission/update', submission , { observe : 'response'});
  }
  confirm(submission): Observable<HttpResponse<any>>{
    return this.http.post<any>('submission/confirm', submission , { observe : 'response'});
  }
  getsubmissionsbyid(id, offset): Observable<HttpResponse<any>>{
    return this.http.get<any>('submission/list/' + id + '/' +offset , { observe : 'response'});
  }
  getlist(id): Observable<HttpResponse<any>>{
    return this.http.get<any>('submission/listall/' + id , { observe : 'response'});
  }
  createRelease(title, description, intervieweename, file : File, interviewee, submissions){
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('title', title);
    formData.append('intervieweename', intervieweename);
    formData.append('description', description);
    formData.append('interviewee', JSON.stringify(interviewee));
    formData.append('submissions', JSON.stringify(submissions));
    return this.http.post<any>('submission/release', formData, { observe : 'response' });
  }
  current(): Observable<HttpResponse<any>>{
    return this.http.get<any>('submission/current' , { observe : 'response'});
  }
  releases(): Observable<HttpResponse<any>>{
    return this.http.get<any>('submission/allreleases' , { observe : 'response'});
  }
  getImage(id){
    return this.http.get('submission/getimage/' + id, { responseType: 'blob' });
  }
  getIntervieweeImage(id){
    return this.http.get('submission/interviewee/' + id, { responseType: 'blob' });
  }
}
