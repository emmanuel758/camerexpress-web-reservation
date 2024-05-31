import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from 'src/app/Services/Loader/loader.service';
import { ReservationService } from 'src/app/Services/Reservation/reservation.service';
import { VoyageService } from 'src/app/Services/Voyage/voyage.service';
import { CustomAlertComponent } from '../../dialogs/custom-alert/custom-alert.component';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent {
  constructor(
    private _location: Location,
    protected _reservationService: ReservationService,
    protected _voyageService: VoyageService,
    protected _loaderService: LoaderService,
    private _matDialog: MatDialog
  ) { }

  // is custom alert vissible
  isCustomAlertVisible = false;

  // bon reduction section visible variable
  panelOpenState = false;

  // code reduction
  code_reduction: string = "";

  /**
   * back to voyage list
   */
  go_to_voyage_list() {
    this._location.back();
  }

  /**
   * apply reduction code
   */
  valider_code_reduction() {

  }

  /**
   * checkout
   */
  payer() {
    // code ...
    let result_dialog = this._matDialog.open(CustomAlertComponent, {
      data: {
        title: "Felicitation",
        message: "Votre reservation a ete confirmer avec success",
        type: "success",
        code: "KJD98X"
      }
    });
  }
}
