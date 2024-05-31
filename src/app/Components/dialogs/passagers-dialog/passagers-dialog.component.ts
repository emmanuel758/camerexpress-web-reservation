import { Component } from '@angular/core';
import { ReservationService } from 'src/app/Services/Reservation/reservation.service';

@Component({
  selector: 'app-passagers-dialog',
  templateUrl: './passagers-dialog.component.html',
  styleUrls: ['./passagers-dialog.component.css']
})
export class PassagersDialogComponent {

  constructor(
    protected _reservationService: ReservationService
  ) { }

}
