import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddFlightService } from '../shared/add-flight.service';

@Component({
  selector: 'app-add-flights',
  templateUrl: './add-flights.component.html',
  styleUrls: ['./add-flights.component.css']
})
export class AddFlightsComponent implements OnInit {

  minDate = new Date();

  cities = [
    {city: 'Ahmedabad'},
    {city: 'Bangalore'},
    {city: 'Chennai'},
    {city: 'Delhi'},
    {city: 'Kolkata'},
    {city: 'Lucknow'},
    {city: 'Mumbai'},
    {city: 'Nagpur'},
    {city: 'Shillong'},
    {city: 'Udaipur'},
  ];

  form= new FormGroup({
    flightId: new FormControl('', Validators.required),
    aircraftId: new FormControl('', Validators.required),
    source: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    departureTime: new FormControl('', Validators.required),
    arrivalTime: new FormControl('', Validators.required),
    departureDate: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required)
  });

  constructor(private addFlightService: AddFlightService) { }

  ngOnInit(): void {
  }
  
  onAddFlight() {
    let date = new Date(this.form.value.departureDate);

    console.log(date.toLocaleDateString());
    let toAddFlight = {
      flight_id: this.form.value.flightId,
      source: this.form.value.source,
      destination: this.form.value.destination,
      departure_time: this.form.value.departureTime,
      arrival_time: this.form.value.arrivalTime,
      departure_date: date.toLocaleDateString(),
      duration: this.form.value.duration,   
      aircraft_id: this.form.value.aircraftId,
      trip_id: this.form.value.flightId
    }

    this.addFlightService.addFlight(toAddFlight).subscribe(response => {
        alert('New Flight added Successfully!');
        this.onClear();
    });
  }

  onClear(){
    this.form.reset();
    this.form.setValue({
      flightId: '',
      aircraftId:'',
      source:'',
      destination:'',      
      departureTime:'',
      arrivalTime:'',
      departureDate:'',
      duration:''
    });
  }

  onSubmit() {
      this.onAddFlight();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }
}
