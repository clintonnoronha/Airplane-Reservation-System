import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddPassengerService {
  url: string = 'http://localhost:9090/passengers';

  constructor(private http: HttpClient) {}

  addPassenger(data: any): Observable<any> {
    return this.http.post(`${this.url}`, data);
  }
}
