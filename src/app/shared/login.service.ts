import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  url:string ="http://localhost:9090/users/login";

  login(data: any) : Observable<any>{
      return this.http.get(`${this.url +'?email='+ data.email + '&password='+ data.password}`,data);
  }

  check(data: any) : Observable<any>{
    return this.http.get(`${this.url + '/' + data.email}`,data);
}
}