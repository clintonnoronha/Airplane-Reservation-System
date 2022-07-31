import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DeleteFlightService {

  url: string= "http://localhost:9090/delete/";
  
  constructor(private http: HttpClient) { }

  deleteFlight(data: any) : Observable<any> {
    return this.http.delete(`${this.url + data.flightId}`, data);
  }


}
