import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocalService } from '../local.service';
import { PaymentService } from '../payment.service';
import { SeatsBookedService } from '../shared/seats-booked.service';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit {

  myForm: FormGroup;

  handler: any = null;

  bookedSeats = [];

  isLoaded = false;

  constructor(private payService: PaymentService, 
    private fb: FormBuilder,
    private seatsBookedService: SeatsBookedService,
    private localStore: LocalService) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      A1: {value: false, disabled: false},
      B1: {value: false, disabled: false},
      C1: {value: false, disabled: false},
      D1: {value: false, disabled: false},
      E1: {value: false, disabled: false},
      F1: {value: false, disabled: false},
      A2: {value: false, disabled: false},
      B2: {value: false, disabled: false},
      C2: {value: false, disabled: false},
      D2: {value: false, disabled: false},
      E2: {value: false, disabled: false},
      F2: {value: false, disabled: false},
      A3: {value: false, disabled: false},
      B3: {value: false, disabled: false},
      C3: {value: false, disabled: false},
      D3: {value: false, disabled: false},
      E3: {value: false, disabled: false},
      F3: {value: false, disabled: false},
      A4: {value: false, disabled: false},
      B4: {value: false, disabled: false},
      C4: {value: false, disabled: false},
      D4: {value: false, disabled: false},
      E4: {value: false, disabled: false},
      F4: {value: false, disabled: false},
      A5: {value: false, disabled: false},
      B5: {value: false, disabled: false},
      C5: {value: false, disabled: false},
      D5: {value: false, disabled: false},
      E5: {value: false, disabled: false},
      F5: {value: false, disabled: false},
      A6: {value: false, disabled: false},
      B6: {value: false, disabled: false},
      C6: {value: false, disabled: false},
      D6: {value: false, disabled: false},
      E6: {value: false, disabled: false},
      F6: {value: false, disabled: false}
    });
    this.fetchSeatsBooked();
    this.invokeStripe();
    this.payService.list();
    let it = this
    setTimeout(function() {
      console.log(it.bookedSeats, 'test');
      Object.keys(it.myForm.controls).forEach(key => {
        console.log(key);
      if (it.bookedSeats.includes(key)) {
        it.myForm.get(key).disable();
        console.log(it.myForm.get(key))
      }
    });
      it.isLoaded = true;
    }, 5000);
  }

  disableBookedSeats() {
    
  }

  fetchSeatsBooked() {
    let toFetchBookedSeats = {
      trip_id: this.localStore.getData('selected_trip_id')
    };

    if (this.localStore.getData('classType') === 'Economy') {
      this.seatsBookedService.fetchBusinessBooked().subscribe(response => {
        this.bookedSeats = response;
        console.log(this.bookedSeats + " " + response);
      });

      this.seatsBookedService.fetchSeatsBooked(toFetchBookedSeats).subscribe(response => {
        response.forEach(e => {
          if (!this.bookedSeats.includes(e)) {
            this.bookedSeats.push(e);
          }
        });
        console.log(this.bookedSeats + " " + response);
      });
    } else if (this.localStore.getData('classType') === 'Business') {
      this.seatsBookedService.fetchEconomySeats().subscribe(response => {
        this.bookedSeats = response;
        console.log(this.bookedSeats + " " + response);
      });

      this.seatsBookedService.fetchSeatsBooked(toFetchBookedSeats).subscribe(response => {
        response.forEach(e => {
          if (!this.bookedSeats.includes(e)) {
            this.bookedSeats.push(e);
          }
        });
        console.log(this.bookedSeats + " " + response);
      });
    }
  }

  addPassengers() {

  }

  confirmAndPay() {
    //if ()
    let selectedSeats = []
    let count = 0;
    let seat_cost = parseInt(this.localStore.getData('price'));
    Object.keys(this.myForm.value).forEach(key => {
      if (this.myForm.get(key).value == true) {
        selectedSeats.push(key);
        count++;
      }
    });
    console.log(selectedSeats);

    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51LNWFMSCO5sv8kG0ynaLvIK0fO5d1uPAOM51O05QKD4jIJJhaBP3LSqmAtXAsxehEMEGvEFJ5lEykh9AI4Bpzu8f000NYg4X7x',
      image: 'https://st2.depositphotos.com/4845131/7223/v/600/depositphotos_72231891-stock-illustration-icon-plane-2.jpg',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken.card.id)
        
        // Successful Payment
        let toCreate = {
          payment_id: stripeToken.card.id,
          amount: count * (seat_cost * 100),
          status: "Paid"
        }

        this.payService.create(toCreate).subscribe(response => {
          alert("Payment Successful!");
        });
        
      }
    });

    handler.open({
      name: 'Mini AirBus',
      description: '' + count + ' Seat(s) Booked',
      amount: count * (seat_cost * 100),
      currency: 'inr',
    })
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      window.document.body.appendChild(script);
    }
  }
}