import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NotifierService } from 'angular-notifier';
import { DateTime } from 'src/app/Models/datetime.interface';
import { Reservation } from 'src/app/Models/reservation.interface';
import { DatetimeService } from 'src/app/Services/Datetime/datetime.service';
import { LoaderService } from 'src/app/Services/Loader/loader.service';
import { ReservationService } from 'src/app/Services/Reservation/reservation.service';

@Component({
  selector: 'app-check-reservation-form',
  templateUrl: './check-reservation-form.component.html',
  styleUrls: ['./check-reservation-form.component.css']
})
export class CheckReservationFormComponent {
  constructor(
    protected _loaderService: LoaderService,
    private _notifierService: NotifierService,
    private _reservationService: ReservationService,
    private _datetimeService: DatetimeService

  ) { }

  // Matcher
  matcher = new ErrorStateMatcher();

  // show deatil form
  isDetailVisible = false;

  // passagerList
  passagersList: string[] = [];

  // code reservation control
  reservation: Reservation = new Reservation();
  codeReservationControl = new FormControl('', [Validators.required]);
  telephoneControl = new FormControl('', [Validators.required]);

  reservationCode: string = ""
  telephone: string = "";

  // site name format
  siteName = "";

  // selected voyage dates
  dateDepart!: Date;
  dateArriver!: Date;

  depart_datetime: DateTime = new DateTime();
  arriver_datetime: DateTime = new DateTime();

  findReservation() {
    // verification si les champs sont bien renseigner
    if (this.codeReservationControl.valid && this.telephoneControl.valid) {

      // start loader
      this._loaderService.setIsLoading(true);

      // request
      this._reservationService.getOne(this.reservationCode).subscribe(response => {
        // stop loader
        this._loaderService.setIsLoading(false);
        switch (response.status) {
          case 200:
            // afficher le composant de detail
            this.reservation = response.data;
            this.initData();
            this.isDetailVisible = true;

            console.log(response);

            break;

          case HttpStatusCode.NoContent:
            this._notifierService.notify('error', 'Aucune réservation correspondante');
            break;

          case HttpStatusCode.InternalServerError:
            this._notifierService.notify('error', 'Une erreur est survenue');
            console.log(response.message);

            break;

          default:
            break;
        }

      });
    } else {
      // notify
      this._notifierService.notify('error', 'Formulaire invalide');
    }
    // envoi la requete de recuperation de la reservation
    // et au retour de la reponse, on affiche le composant de detaill

  }

  initData() {
    // parse site name
    this.siteName = this.reservation.voyage.itineraire.site.agence.nom + '(' + this.reservation.voyage.itineraire.site.quartier + ')';

    // parse date
    this.dateDepart = new Date(this.reservation.voyage.dateDepart);
    this.dateArriver = new Date(this.reservation.voyage.dateDepart);
    this.dateArriver.setHours(this.dateArriver.getHours() + this.reservation.voyage.itineraire.duree);

    this.depart_datetime = this._datetimeService.formatDate(this.dateDepart);
    this.arriver_datetime = this._datetimeService.formatDate(this.dateArriver);

    // init passagerList
    this.passagersList = JSON.parse(this.reservation.passagers);
    console.log(this.passagersList[0]);
    
  }
}
