import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalService } from '../local.service';
import { PaymentService } from '../payment.service';
import { AddPassengerService } from '../shared/add-passenger.service';
import { PassService } from '../shared/pass.service';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.css'],
})
export class AddPassengerComponent implements OnInit {
  form = new FormGroup({
    seatNumber: new FormControl({ value: '', disabled: true }),
    title: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    age: new FormControl(0, Validators.required),
  });

  count = 0;

  isLoaded = false;

  isTrue = true;

  titles = ['Mr.', 'Ms.', 'Mrs.'];

  passengers = [];

  constructor(
    private payService: PaymentService,
    private passService: PassService,
    private localStore: LocalService,
    private addPassengerService: AddPassengerService,
    private dialog: DialogRef<AddPassengerComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.passService.invokeEvent.subscribe((value) => {
      this.passengers = value;
      let it = this;
      setTimeout(() => {
        it.isLoaded = true;
      }, 2000);
    });

    this.invokeStripe();
  }

  onClear() {
    this.form.reset();
    this.form.setValue({
      seatNumber: '',
      title: '',
      name: '',
      age: 0,
    });
  }

  onSubmit() {
    if (this.form.value.age <= 0) {
      alert('Invalid Age');
      return;
    }
    let seat = this.passengers[this.count];
    let toAdd = {
      trip_id: this.localStore.getData('selected_trip_id'),
      seat_id: seat,
      name: this.form.value.name,
      age: this.form.value.age,
    };

    this.count++;

    this.addPassengerService.addPassenger(toAdd).subscribe((response) => {
      console.log(response);
    });
  }

  async onDone() {
    let count = this.passengers.length;
    let cnt = this.count;

    let seat_cost = parseInt(this.localStore.getData('price'));

    let toCreate = {
      userId: this.localStore.getData('user_id'),
      paymentId: '',
      tripId: this.localStore.getData('selected_trip_id'),
      bookingDate: new Date().toLocaleDateString(),
      status: 'Paid',
      amount: count * (seat_cost),
    };

    let it = this;

    if (count == cnt) {
      const handler = await (<any>window).StripeCheckout.configure({
        key: '<Enter your Strip public key>',
        image:
          'https://st2.depositphotos.com/4845131/7223/v/600/depositphotos_72231891-stock-illustration-icon-plane-2.jpg',
        locale: 'auto',
        token: function (stripeToken: any) {
          // Successful Payment
  
          toCreate.paymentId = stripeToken.card.id;
          console.log(toCreate);
          if (toCreate.paymentId !== '') {
            it.payService.create(toCreate).subscribe((response) => {
              console.log("payment check");
              alert('Payment Successful!');
              it.router.navigateByUrl('/search');
            });
          }
        },
      });
  
      handler.open({
        name: 'Mini AirBus',
        description: '' + count + ' Seat(s) Booked',
        amount: count * (seat_cost * 100),
        currency: 'inr',
      });
    }

    this.dialog.close();
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

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  };
}
