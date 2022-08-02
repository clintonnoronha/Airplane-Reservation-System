import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent implements OnInit {

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

  minDate = new Date();
  isOneWay = true;

  form= new FormGroup({
    journeyType: new FormControl(0, Validators.required),
    source: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    departureDate: new FormControl('', Validators.required),
    returnDate: new FormControl(''),
    classType: new FormControl('' , Validators.required)
  });

  constructor(private localStore: LocalService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let getValue = this.form.value.journeyType;
    if (Number(getValue) === Number(1)) {
      let date = new Date(this.form.value.departureDate);
      this.localStore.saveData('journeyType', 'OneWay');
      this.localStore.saveData('departureDate', date.toLocaleDateString());
      this.localStore.saveData('source', this.form.value.source);
      this.localStore.saveData('destination', this.form.value.destination);
      this.localStore.saveData('classType', this.form.value.classType);
    } else if (Number(getValue) === Number(2)) {
      let date = new Date(this.form.value.returnDate);
      let date2 = new Date(this.form.value.departureDate);
      this.localStore.saveData('journeyType', 'Return');
      this.localStore.saveData('departureDate', date2.toLocaleDateString());
      this.localStore.saveData('returnDate', date.toLocaleDateString());
      this.localStore.saveData('source', this.form.value.source);
      this.localStore.saveData('destination', this.form.value.destination);
      this.localStore.saveData('classType', this.form.value.classType);
    }
    this.router.navigateByUrl('/view-flights');
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }


  disableReturn(event: MatRadioChange) {
    console.log(event.value);
    if (event.value == 1) {
      this.isOneWay = true;
    } else if (event.value == 2) {
      this.isOneWay = false;
    }
  }

}
