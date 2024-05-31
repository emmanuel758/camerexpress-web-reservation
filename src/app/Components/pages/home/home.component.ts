import { HttpStatusCode } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Site } from 'src/app/Models/site.interface';
import { Ville } from 'src/app/Models/ville.interface';
import { LoaderService } from 'src/app/Services/Loader/loader.service';
import { VilleService } from 'src/app/Services/Ville/ville.service';
import { VoyageService } from 'src/app/Services/Voyage/voyage.service';
import { SiteService } from 'src/app/Services/site/site.service';
import { PassagersDialogComponent } from '../../dialogs/passagers-dialog/passagers-dialog.component';
import { ReservationService } from 'src/app/Services/Reservation/reservation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private _villeService: VilleService,
    private _siteService: SiteService,
    private _notifierService: NotifierService,
    protected _loaderService: LoaderService,
    private _voyageService: VoyageService,
    private _router: Router,
    private _matDialog: MatDialog,
    protected _reservationService: ReservationService
  ) { }

  // Matcher
  matcher = new ErrorStateMatcher();

  // Form control
  villeDepartFormControl = new FormControl('', [Validators.required]);
  villeDestinationFormControl = new FormControl('', [Validators.required]);
  dateFormControl = new FormControl('', []);
  siteFormControl = new FormControl('', []);

  // variables
  villeDepart: Ville = new Ville();
  villeDestination: Ville = new Ville();
  dateDepart: Date | null = null;
  site: Site = new Site();

  /**
   * 
   */
  open_passagers_dialog() {
    let passagers_dialog = this._matDialog.open(PassagersDialogComponent, {
      data: {}, minWidth: 400
    });

    passagers_dialog.afterClosed().subscribe(result => { });
  }

  // min date depart
  minDate: Date = new Date();

  // Liste des villes
  villes: Ville[] = [];

  // liste des sites
  sites: Site[] = [];

  /**
   * Handle get ville request
   */
  getVilles() {
    this._villeService.getAll().subscribe(response => {
      this.villes = response;
    });
  }

  /**
   * Handle on change ville depart value
   * @param event 
   */
  onVilleDeparChange(event: number) {
    this._siteService.getAll(event).subscribe(response => {
      this.sites = response;
    });
  }

  /**
   * Handle search travel request
   */
  rechercher() {
    // les champs obligatoire
    if (this.villeDepartFormControl.valid && this.villeDestinationFormControl.valid) {

      // ville depart != ville destination
      if (this.villeDepart.id != this.villeDestination.id) {

        if (this._reservationService.passagers_adultes > 0) {
          // start loader
          this._loaderService.setIsLoading(true);

          try {

            // on sauvegarde les valeur pour le filtre (agence, date depart, classe) ------------------------------------------------
            if (this.dateDepart != null)
              this._voyageService.dateDepart = new Date(this.dateDepart);

            // get site
            let s: Site | undefined = this.sites.find((s, i) => { return s.id == this.site.id });
            if (s != undefined) {
              this._voyageService.site = s;
            } else {
              this._voyageService.site.id = -1;
            }

            // ville depart
            this._voyageService.villeDepart = this.villes.filter((v) => { return v.id == this.villeDepart.id; })[0];

            // ville destination
            this._voyageService.villeDestination = this.villes.filter((v) => { return v.id == this.villeDestination.id; })[0];

            // liste des site
            this._voyageService.sites = this.sites;

            // recuperation des parametres ---------------------------------------------------------------------------------------------

            // send request
            this._voyageService.getVoyages(
              this.villeDepart.id, this.villeDestination.id
            ).subscribe(response => {

              // stop loader
              this._loaderService.setIsLoading(false);

              // parse response
              let responseJson = JSON.parse(JSON.stringify(response));

              if (responseJson.status == HttpStatusCode.InternalServerError) {
                this._notifierService.notify('error', "Une erreur est survenue.");

                // log error
                console.error(responseJson.message);

              } else {
                if (responseJson.status == HttpStatusCode.Ok) {

                  // on recupere la liste des voyage
                  this._voyageService.voyages = responseJson.data;

                  // on navigue vers la page des voyages
                  this._router.navigateByUrl('voyages');

                } else {
                  this._notifierService.notify('default', "Aucun trajet correspondant.");
                }
              }
            });
          } catch (error) {
            this._notifierService.notify('error', "Une erreur est survenue.");

            // log error in console
            console.log(error);
          }
        } else {
          this._notifierService.notify('error', "Ajoutez au moins un adulte.")
        }



      } else {
        this._notifierService.notify('error', "La ville de départ doit être différente de la ville de destination");
      }
    } else {
      this._notifierService.notify('error', "Sélectionner une ville de départ et une ville de destination");
    }

  }

  ngOnInit() {
    this.site.id = -1;
    this.getVilles();
  }

}
