import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from 'src/app/Services/Loader/loader.service';
import { ReservationService } from 'src/app/Services/Reservation/reservation.service';
import { VoyageService } from 'src/app/Services/Voyage/voyage.service';
import { CustomAlertComponent } from '../../dialogs/custom-alert/custom-alert.component';
import { jsPDF } from "jspdf";
import { DateTime } from 'src/app/Models/datetime.interface';
import { DatetimeService } from 'src/app/Services/Datetime/datetime.service';
import { Reservation } from 'src/app/Models/reservation.interface';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';
import { PdfService } from 'src/app/Services/Pdf/pdf.service';

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
    private _datetimeService: DatetimeService,
    private _notifierService: NotifierService,
    private _matDialog: MatDialog,
    private _router: Router,
  ) { }

  // error state matcher
  matcher = new ErrorStateMatcher();

  // tableau des controle pour passager adultes
  passager_adulte_formsControls: FormControl[] = [];

  // tableau des controle pour passager
  passager_enfant_formsControls: FormControl[] = [];

  // is custom alert vissible
  isCustomAlertVisible = false;

  // terms policy
  isTermspolicyChecked = false;

  /**
   * ID du moyen de paiement
   * 
   * 0 = Nothing  
   * 1 = Tesea-Pay
   */
  ID_moyenpaiement = 0;

  // bon reduction section visible variable
  panelOpenState = false;

  // code reduction
  code_reduction: string = "";

  // site name format
  siteName = "";

  // prix par passagers (pour eviter de faire des conditions)
  prix_par_passager: number = this._reservationService.selected_voyage.bus.classe == "VIP" ? this._reservationService.selected_voyage.itineraire.prixVip : this._reservationService.selected_voyage.itineraire.prixClassique;

  // prix total passager adultes
  prix_total_passager_adulte: number = this.prix_par_passager * this._reservationService.passagers_adultes;

  // prix total passager enfants
  prix_total_passager_enfant: number = this.prix_par_passager * this._reservationService.passagers_enfant;

  // prix total
  prix_total_passager: number = this.prix_total_passager_adulte + this.prix_total_passager_enfant;

  // selected voyage dates
  dateDepart!: Date;
  dateArriver!: Date;

  depart_datetime: DateTime = new DateTime();
  arriver_datetime: DateTime = new DateTime();

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
   * Effacer le moyen de paiement
   */
  clear_moyen_paiement() {
    this.ID_moyenpaiement = 0;
  }

  /**
   * checkout
   */
  payer() {
    // verifier que les noms des passagers sont renseigner
    for (let control of this.passager_adulte_formsControls) {
      if (!control.valid) {
        this._notifierService.notify('error', "Formulaire des passagers invalide.");
        return;
      }
    }
    for (let control of this.passager_enfant_formsControls) {
      if (!control.valid) {
        this._notifierService.notify('error', "Formulaire des passagers invalide.");
        return;
      }
    }

    // verification des autres section -- comming soon --
    // verifier qu'un moyen de paiement a ete selectionner
    if (this.ID_moyenpaiement == 0) {
      this._notifierService.notify('error', 'Aucun moyen de paiement sélectionné');
      return;
    }

    // verifier que la case de politique a ete cocher
    if (!this.isTermspolicyChecked) {
      this._notifierService.notify('error', "Veuillez accepter les termes d'utilisation");
      return;
    }

    // lancement du moyen de paiement selectionner
    // envoi de la requete de paiement
    // si paiement effectuer -> envoi de la requete de creation de reservation
    let reservation: Reservation = new Reservation();
    reservation.client = null;
    reservation.nom = this._reservationService.passagers_adultes_array[0];
    reservation.placesAdulte = this._reservationService.passagers_adultes;
    reservation.placesEnfant = this._reservationService.passagers_enfant;
    reservation.passagers = JSON.stringify(this._reservationService.passagers_adultes_array.concat(this._reservationService.passagers_enfant_array));
    reservation.voyage = this._reservationService.selected_voyage;
    reservation.classe = this._reservationService.selected_voyage.bus.classe;
    reservation.bagages = "";
    reservation.isAlertSms = false;
    reservation.scanned = false;
    let p = this._reservationService.selected_voyage.bus.classe == "VIP" ? this._reservationService.selected_voyage.itineraire.prixVip : this._reservationService.selected_voyage.itineraire.prixClassique;
    reservation.prix = p * (reservation.placesAdulte + reservation.placesEnfant);
    reservation.statut = "CONFIRMÉE";

    let data = {
      reservation: reservation,
      bons: []
    }

    // start loader
    this._loaderService.isLoading = true;

    // send request
    this._reservationService.create(data).subscribe(response => {
      // stop loader
      this._loaderService.setIsLoading(false);

      if (response.status == HttpStatusCode.Created) {
        // au retour de la reponse, generer le billet
        let reservationResponse: Reservation = response.data;

        // ouverture de la boite de dialogue pour afficher le code de reservation
        // code ...
        let result_dialog = this._matDialog.open(CustomAlertComponent, {
          data: {
            title: "Félicitation",
            message: "Votre reservation a été confirmé avec succèss",
            type: "success",
            reservation: reservationResponse
          }
        });

        // retour a la page d'accueil
        result_dialog.afterClosed().subscribe(_ => {
          this._router.navigateByUrl('/');
        });
      } else {
        this._notifierService.notify('error', "Une erreur est survenue.");
        console.error(response.message);
      }
    });

  }

  ngOnInit() {

    // parse site name
    this.siteName = this._reservationService.selected_voyage.itineraire.site.agence.nom + '(' + this._reservationService.selected_voyage.itineraire.site.quartier + ')';

    // parse date
    this.dateDepart = new Date(this._reservationService.selected_voyage.dateDepart);
    this.dateArriver = new Date(this._reservationService.selected_voyage.dateDepart);
    this.dateArriver.setHours(this.dateArriver.getHours() + this._reservationService.selected_voyage.itineraire.duree);

    this.depart_datetime = this._datetimeService.formatDate(this.dateDepart);
    this.arriver_datetime = this._datetimeService.formatDate(this.dateArriver);

    // init passager adulte form control
    for (let index = 0; index < this._reservationService.passagers_adultes; index++) {
      let control = new FormControl('', [Validators.required]);
      this.passager_adulte_formsControls.push(control);
    }

    // init passager enfant form control
    for (let index = 0; index < this._reservationService.passagers_enfant; index++) {
      let control = new FormControl('', [Validators.required]);
      this.passager_enfant_formsControls.push(control);
    }

  }
}
