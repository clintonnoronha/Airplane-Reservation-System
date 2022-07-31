import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddFlightService {

  url:string="http://localhost:9090/add";

  constructor(private http: HttpClient) { }

  addFlight(data: any): Observable<any> {
    return this.http.post(`${this.url}`,data);
  }
}
