import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyTripService {

  url: string="http://localhost:9090/bookings/";

  constructor(private http: HttpClient) {
    
   }

   myTrips(data: any): Observable<any>{
    return this.http.get(`${this.url + data.id}`, data);
    
   }
}
