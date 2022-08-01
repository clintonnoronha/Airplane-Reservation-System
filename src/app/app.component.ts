import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Mini AirBus';

  msgFromSeatToAddPass: any;

  fwdMsgToSib($event) {
    this.msgFromSeatToAddPass = $event;
  }
}
