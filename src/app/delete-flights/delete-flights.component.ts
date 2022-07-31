import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeleteFlightService } from '../shared/delete-flight.service';

@Component({
  selector: 'app-delete-flights',
  templateUrl: './delete-flights.component.html',
  styleUrls: ['./delete-flights.component.css']
})
export class DeleteFlightsComponent implements OnInit {

  form= new FormGroup({
    flightId: new FormControl('', Validators.required)
  });

  constructor(private deleteFlightService: DeleteFlightService) { }

  ngOnInit(): void {
  }

  onDeleteFlight(){
    let toDeleteFlight= {
      flightId: this.form.value.flightId
    }
    
    this.deleteFlightService.deleteFlight(toDeleteFlight).subscribe(response => {
        this.form.reset();
        alert("Flight with ID: " + response + " is deleted!");
    });
    
  }

  onSubmit() {
    this.onDeleteFlight();
  }  

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
}
