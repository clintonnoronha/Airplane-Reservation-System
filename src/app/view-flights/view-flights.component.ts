import { Component, OnInit } from '@angular/core';
import { LocalService } from '../local.service';
import { SearchFlightService } from '../shared/search-flight.service';

@Component({
  selector: 'app-view-flights',
  templateUrl: './view-flights.component.html',
  styleUrls: ['./view-flights.component.css']
})
export class ViewFlightsComponent implements OnInit {

  return = false;
  oneWayList = [];
  returnList = [];

  constructor(private searchFlightService: SearchFlightService,
    private localStore: LocalService) { }

  ngOnInit(): void {
    this.loadFlights();
  }

  onSearchOneWay() {
    let toSearchFlight = {
      departure_date: this.localStore.getData('departureDate'),
      source: this.localStore.getData('source'),
      destination: this.localStore.getData('destination')
    }
    this.oneWayList = [];
    this.searchFlightService.searchFlightOneWay(toSearchFlight).subscribe(response => {
      this.oneWayList = response;
    });
  }

  onSearchReturn() {
    let toSearchFlight = {
      departure_date: this.localStore.getData('returnDate'),
      source: this.localStore.getData('destination'),
      destination: this.localStore.getData('source')
    }
    this.returnList = [];
    this.searchFlightService.searchFlightReturn(toSearchFlight).subscribe(response => {
        this.returnList = response;
    });
  }

  loadFlights() {
    if(this.localStore.getData('journeyType') === 'OneWay') {
      this.return=false;
      this.onSearchOneWay();
    } else if (this.localStore.getData('journeyType') === 'Return') {
      this.return=true;
      this.onSearchOneWay();
      this.onSearchReturn();
    }
  }

  bookFlight(){

  }

}
