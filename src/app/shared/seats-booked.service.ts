import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeatsBookedService {

  url: string = "http://localhost:9090/passengers/";

  urlB: string = "http://localhost:9090/seat/business";

  urlE: string = "http://localhost:9090/seat/economy";

  constructor(private http: HttpClient) { }

  fetchSeatsBooked(data: any): Observable<any> {
    return this.http.get(`${this.url + data.trip_id}`);
  }

  fetchEconomySeats(): Observable<any> {
    return this.http.get(`${this.urlE}`);
  }

  fetchBusinessBooked(): Observable<any> {
    return this.http.get(`${this.urlB}`);
  }
}
