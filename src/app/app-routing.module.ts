import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { MyTripsComponent } from './my-trips/my-trips.component';
import { SearchFlightComponent } from './search-flight/search-flight.component';

const routes: Routes = [
  { path: 'trip', component: MyTripsComponent },
  { path: 'search', component: SearchFlightComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
