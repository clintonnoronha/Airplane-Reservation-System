import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../local.service';
import { SearchFlightService } from '../shared/search-flight.service';

@Component({
  selector: 'app-view-flights',
  templateUrl: './view-flights.component.html',
  styleUrls: ['./view-flights.component.css'],
})
export class ViewFlightsComponent implements OnInit {
  return = false;
  oneWayList = [];
  returnList = [];
  tripDetailsList = [];

  constructor(
    private searchFlightService: SearchFlightService,
    private localStore: LocalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFlights();
  }

  onSearchOneWay() {
    let toSearchFlight = {
      departure_date: this.localStore.getData('departureDate'),
      source: this.localStore.getData('source'),
      destination: this.localStore.getData('destination'),
      seat_type: this.localStore.getData('classType'),
    };
    this.oneWayList = [];
    this.searchFlightService
      .searchFlightOneWay(toSearchFlight)
      .subscribe((response) => {
        this.oneWayList = response;
      });
  }

  onSearchReturn() {
    let toSearchFlight = {
      departure_date: this.localStore.getData('returnDate'),
      source: this.localStore.getData('destination'),
      destination: this.localStore.getData('source'),
      seat_type: this.localStore.getData('classType'),
    };
    this.returnList = [];
    this.searchFlightService
      .searchFlightReturn(toSearchFlight)
      .subscribe((response) => {
        this.returnList = response;
      });
  }

  loadFlights() {
    if (this.localStore.getData('journeyType') === 'OneWay') {
      this.return = false;
      this.onSearchOneWay();
    } else if (this.localStore.getData('journeyType') === 'Return') {
      this.return = true;
      this.onSearchOneWay();
      this.onSearchReturn();
    }
  }

  bookFlight(trip_id: any, price: any) {
    if (this.localStore.getData('user_id') !== null) {
      this.localStore.saveData('selected_trip_id', trip_id);
      this.localStore.saveData('price', price);
      console.log(
        this.localStore.getData('selected_trip_id') +
          ', ' +
          this.localStore.getData('price')
      );
      this.router.navigateByUrl('/seat-selection');
    } else {
      alert('User not logged in');
    }
  }
}
