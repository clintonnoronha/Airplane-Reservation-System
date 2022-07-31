import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AddFlightsComponent } from './add-flights/add-flights.component';
import { DeleteFlightsComponent } from './delete-flights/delete-flights.component';
import { MyTripsComponent } from './my-trips/my-trips.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';

const routes: Routes = [
  { path: 'trip', component: MyTripsComponent },
  { path: 'search', component: SearchFlightComponent },
  { path: 'about', component: AboutComponent },
  { path: 'add-flight', component: AddFlightsComponent },
  { path: 'delete-flight', component: DeleteFlightsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
