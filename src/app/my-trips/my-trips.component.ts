import { Component, OnInit } from '@angular/core';
import { LocalService } from '../local.service';
import { MyTripService } from '../shared/my-trip.service';

@Component({
  selector: 'app-my-trips',
  templateUrl: './my-trips.component.html',
  styleUrls: ['./my-trips.component.css']
})
export class MyTripsComponent implements OnInit {

  tripList = [];

  constructor(private myTripService: MyTripService, 
    private localStore: LocalService) { }

  ngOnInit(): void {
    this.onLoadTrips();
  }

  onLoadTrips(){
    let toTrip = {
      id: this.localStore.getData('user_id')
    };

    this.myTripService.myTrips(toTrip).subscribe(response => {
      this.tripList=response;
    });
  }

}
