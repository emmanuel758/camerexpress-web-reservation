import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ShowVoyageDialogComponent } from '../../dialogs/show-voyage-dialog/show-voyage-dialog.component';
import { Voyage } from 'src/app/Models/voyage.interface';
import { DateTime } from 'src/app/Models/datetime.interface';
import { DatetimeService } from 'src/app/Services/Datetime/datetime.service';
import { ReservationService } from 'src/app/Services/Reservation/reservation.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-voyage-item',
  templateUrl: './voyage-item.component.html',
  styleUrls: ['./voyage-item.component.css']
})


export class VoyageItemComponent {

  /**
   * Voyage 
   */
  @Input() voyage!: Voyage;
  // voyage: Voyage = new Voyage();

  dateDepart!: Date;
  dateArriver!: Date;

  depart_datetime: DateTime = new DateTime();
  arriver_datetime: DateTime = new DateTime();

  //site name
  siteName = "";

  constructor(
    private _matDialog: MatDialog,
    private _datetimeService: DatetimeService,
    private _reservationService: ReservationService,
    private _router: Router,
    private _notifierService: NotifierService
  ) {

  }

  // on a en entree le voyage

  /**
   * Navigate to agency postion on maps
   */
  goToAgencyLocation() {
    alert("agency position");
  }

  /**
   * Display all informations about voyage
   */
  showDetail() {
    this._matDialog.open(ShowVoyageDialogComponent, {
      data: {
        voyage: this.voyage
      }
    });
  }

  /**
   * Select current voyahe and go to reservation page
   */
  goToRservationPage() {

    // verifier sil y'a aumoins un adulte
    if (this._reservationService.passagers_adultes > 0) {
      // selected voyage
      this._reservationService.selected_voyage = this.voyage;

      // navigate to reservation form
      this._router.navigateByUrl("reservation-form");
    } else {
      this._notifierService.notify('error', "Ajouter au moins un adulte");
    }

  }

  ngOnInit() {
    this.dateDepart = new Date(this.voyage.dateDepart);
    this.dateArriver = new Date(this.voyage.dateDepart);
    this.dateArriver.setHours(this.dateArriver.getHours() + this.voyage.itineraire.duree);

    this.depart_datetime = this._datetimeService.formatDate(this.dateDepart);
    this.arriver_datetime = this._datetimeService.formatDate(this.dateArriver);

    // parse site name
    this.siteName = this.voyage.itineraire.site.agence.nom + '(' + this.voyage.itineraire.site.quartier + ')';
  }
}
