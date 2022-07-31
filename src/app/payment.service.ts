import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url: string = "http://localhost:9090/payments";

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    let API_URL = `${this.url}`;
    return this.http.post(API_URL, data);
  }

  list(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

}
