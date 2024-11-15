import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  url:string ="http://localhost:9090/users";

  register(data: any) : Observable<any> {
    return this.http.post(`${this.url}`,data);
  }
}
