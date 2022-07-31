import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  url:string = "http://localhost:9090/users/forgotPassword/";

  forgotPassword(data : any): Observable<any> {
      return this.http.put(`${this.url + data.email + '?password=' + data.password}`,data);
  }

  
}
