import { Component, OnInit } from '@angular/core';
import { DeleteFlightService } from '../shared/delete-flight.service';
import { SearchFlightService } from '../shared/search-flight.service';

@Component({
  selector: 'app-delete-flights',
  templateUrl: './delete-flights.component.html',
  styleUrls: ['./delete-flights.component.css']
})
export class DeleteFlightsComponent implements OnInit {

  allFlights = [];

  constructor(private searchFlightService: SearchFlightService,
    private deleteFlightService: DeleteFlightService
    ) { }

  ngOnInit(): void {
    this.onLoad();
  }

  onLoad() {
   this.searchFlightService.searchFlights().subscribe(response=>{
    this.allFlights=response;
   });
  }

  deleteFlight(id: any){
    let toDeleteFlight= {
      flightId: id
    }
    
    this.deleteFlightService.deleteFlight(toDeleteFlight).subscribe(response => {
        alert("Flight with ID: " + response + " is deleted!");
        window.location.reload();
    });
  }
  

}
