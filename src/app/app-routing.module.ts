import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/pages/home/home.component';
import { VoyageListComponent } from './Components/pages/voyage-list/voyage-list.component';
import { ReservationFormComponent } from './Components/pages/reservation-form/reservation-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'voyages', component: VoyageListComponent },
  { path: 'reservation-form', component: ReservationFormComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
