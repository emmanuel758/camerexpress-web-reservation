import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/pages/home/home.component';
import { VoyageListComponent } from './Components/pages/voyage-list/voyage-list.component';
import { ReservationFormComponent } from './Components/pages/reservation-form/reservation-form.component';
import { GererReservationComponent } from './Components/pages/gerer-reservation/gerer-reservation.component';
import { CheckReservationFormComponent } from './Components/pages/check-reservation-form/check-reservation-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'voyages', component: VoyageListComponent },
  { path: 'reservation-form', component: ReservationFormComponent },
  { path: 'service/gerer-reservation', component: GererReservationComponent, title: "CamerExpress - Gerer ma réservation" },
  { path: 'service/gerer-reservation/detail', component: CheckReservationFormComponent, title: "CamerExpress - Consulter" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
