import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { AddPassengerComponent } from '../add-passenger/add-passenger.component';
import { LocalService } from '../local.service';
import { PaymentService } from '../payment.service';
import { PassService } from '../shared/pass.service';
import { SeatsBookedService } from '../shared/seats-booked.service';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css'],
})
export class SeatSelectionComponent implements OnInit {
  myForm: FormGroup;

  handler: any = null;

  bookedSeats = [];

  booked = [];

  selectSeats = [];

  isLoaded = false;

  @Output() msgToSibling = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private seatsBookedService: SeatsBookedService,
    private addPassengerDialog: MatDialogRef<AddPassengerComponent>,
    private localStore: LocalService,
    private dialog: MatDialog,
    private passService: PassService
  ) {}

  ngOnInit() {
    this.fetchSeatsBooked();
    this.myForm = this.fb.group({
      A1: { value: false, disabled: false },
      B1: { value: false, disabled: false },
      C1: { value: false, disabled: false },
      D1: { value: false, disabled: false },
      E1: { value: false, disabled: false },
      F1: { value: false, disabled: false },
      A2: { value: false, disabled: false },
      B2: { value: false, disabled: false },
      C2: { value: false, disabled: false },
      D2: { value: false, disabled: false },
      E2: { value: false, disabled: false },
      F2: { value: false, disabled: false },
      A3: { value: false, disabled: false },
      B3: { value: false, disabled: false },
      C3: { value: false, disabled: false },
      D3: { value: false, disabled: false },
      E3: { value: false, disabled: false },
      F3: { value: false, disabled: false },
      A4: { value: false, disabled: false },
      B4: { value: false, disabled: false },
      C4: { value: false, disabled: false },
      D4: { value: false, disabled: false },
      E4: { value: false, disabled: false },
      F4: { value: false, disabled: false },
      A5: { value: false, disabled: false },
      B5: { value: false, disabled: false },
      C5: { value: false, disabled: false },
      D5: { value: false, disabled: false },
      E5: { value: false, disabled: false },
      F5: { value: false, disabled: false },
      A6: { value: false, disabled: false },
      B6: { value: false, disabled: false },
      C6: { value: false, disabled: false },
      D6: { value: false, disabled: false },
      E6: { value: false, disabled: false },
      F6: { value: false, disabled: false },
    });
    let it = this;
    setTimeout(function () {
      console.log(it.booked, 'test');
      Object.keys(it.myForm.controls).forEach((key) => {
        console.log(key);
        if (it.bookedSeats.includes(key)) {
          it.myForm.get(key).disable();
          console.log(it.myForm.get(key));
        }
      });
      it.isLoaded = true;
    }, 5000);
  }

  moveToSib() {
    this.msgToSibling.emit(this.selectSeats);
  }

  fetchSeatsBooked() {
    let toFetchBookedSeats = {
      trip_id: this.localStore.getData('selected_trip_id'),
    };

    if (this.localStore.getData('classType') === 'Economy') {
      
      this.seatsBookedService.fetchBusinessBooked(toFetchBookedSeats).subscribe((response) => {
        this.bookedSeats = response;
        console.log(this.bookedSeats + ' ' + response);
      });

      console.log(this.booked);

    } else if (this.localStore.getData('classType') === 'Business') {

      this.seatsBookedService.fetchEconomySeats(toFetchBookedSeats).subscribe((response) => {
        this.bookedSeats = response;
        console.log(this.bookedSeats + ' ' + response);
      });

    }
  }

  addPassengers() {
    if (!this.addPassengerDialog) {
      return;
    }

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    let selectedSeats = [];
    let count = 0;
    Object.keys(this.myForm.value).forEach((key) => {
      if (this.myForm.get(key).value == true) {
        selectedSeats.push(key);
        count++;
      }
    });

    this.selectSeats = selectedSeats;

    setTimeout(() => {
      this.passService.invokeEvent.next(this.selectSeats);
    }, 1000);

    this.addPassengerDialog = this.dialog.open(
      AddPassengerComponent,
      dialogConfig
    );

    this.moveToSib();

    this.addPassengerDialog
      .afterClosed()
      .pipe(finalize(() => (this.addPassengerDialog = undefined)));
  }
}
