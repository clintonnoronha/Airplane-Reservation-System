import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchFlightService {

  constructor(private http: HttpClient) { }
  
  url:string ="http://localhost:9090/search";

  urlFlight:string ="http://localhost:9090/flights";

  searchFlights(): Observable<any> {
    return this.http.get(`${this.urlFlight}`);
  }

  searchFlightOneWay(data: any): Observable<any> {
    return this.http.get(`${this.url + '?departure_date=' + data.departure_date + 
    '&source=' + data.source + '&destination=' + data.destination + 
    '&seat_type=' + data.seat_type}`, data);
  }

  searchFlightReturn(data: any): Observable<any> {
    return this.http.get(`${this.url + '?departure_date=' + data.departure_date + 
    '&source=' + data.source + '&destination=' + data.destination + 
    '&seat_type=' + data.seat_type}`, data);
  }

}
