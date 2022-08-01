import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyTripsComponent } from './my-trips/my-trips.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ViewFlightsComponent } from './view-flights/view-flights.component';
import { AddFlightsComponent } from './add-flights/add-flights.component';
import { DeleteFlightsComponent } from './delete-flights/delete-flights.component';
import { AddPassengerComponent } from './add-passenger/add-passenger.component';

@NgModule({
  declarations: [
    AppComponent,
    SeatSelectionComponent,
    NavbarComponent,
    SearchFlightComponent,
    AboutComponent,
    LoginComponent,
    RegisterComponent,
    MyTripsComponent,
    ForgotPasswordComponent,
    ViewFlightsComponent,
    AddFlightsComponent,
    DeleteFlightsComponent,
    AddPassengerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NavbarComponent]
})
export class AppModule { }
