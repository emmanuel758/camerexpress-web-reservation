import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ReservationService } from 'src/app/Services/Reservation/reservation.service';
import { VoyageService } from 'src/app/Services/Voyage/voyage.service';
import { PassagersDialogComponent } from '../../dialogs/passagers-dialog/passagers-dialog.component';

@Component({
  selector: 'app-voyage-list',
  templateUrl: './voyage-list.component.html',
  styleUrls: ['./voyage-list.component.css']
})
export class VoyageListComponent {

  constructor(
    protected _voyageService: VoyageService,
    protected _reservationService: ReservationService,
    private _router: Router,
    private _location: Location,
    private _matDialog: MatDialog
  ) { }

  /**
   * 
   */
  open_passagers_dialog() {
    let passagers_dialog = this._matDialog.open(PassagersDialogComponent, {
      data: {}, minWidth: 400
    });

    passagers_dialog.afterClosed().subscribe(result => { });
  }

  // toggle filter visibility
  isFilterVisible = true;

  /**
   * toggle filter visibility function
   */
  toggleFilterVisibility() {
    this.isFilterVisible = !this.isFilterVisible;
  }

  /**
   * Back to home
   */
  backToHome() {
    // this._location.back();
    this._router.navigateByUrl('home')
  }

  convertMinutesToHHMM(minutes: number): string {
    // Calculer les heures et les minutes
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    // Formater les heures et les minutes pour toujours avoir 2 chiffres
    const formattedHours = this.padWithZero(hours);
    const formattedMinutes = this.padWithZero(mins);

    // Retourner le format HH:MM
    return `${formattedHours}:${formattedMinutes}`;
  }

  // Fonction utilitaire pour ajouter un zéro devant les nombres inférieurs à 10
  private padWithZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  test() {
    console.log(this._voyageService.min_prix);

  }

  filterVoyage() {
    // classe
    let voyagesFilterClass = this._voyageService.voyages.filter((v, i) => {
      if (this._voyageService.classe != null) {
        return v.bus.classe == this._voyageService.classe;
      } else {
        return true;
      }
    });

    // date
    let voyagesFilterDate = this._voyageService.voyages.filter((v, i) => {
      if (this._voyageService.dateDepart != null) {
        return v.bus.classe == this._voyageService.classe
      } else {
        return true;
      }
    });

    // site
    let voyagesFilterSite = this._voyageService.voyages.filter((v, i) => {
      if (this._voyageService.site.id != -1) {
        return v.itineraire.site.id == this._voyageService.site.id;
      } else {
        return true;
      }
    });

    // prix
    let voyageFilterPrix = this._voyageService.voyages.filter((v) => {
      if (v.bus.classe == "VIP") {
        return v.itineraire.prixVip >= this._voyageService.min_prix &&
          v.itineraire.prixVip <= this._voyageService.max_prix;
      } else {
        return v.itineraire.prixClassique >= this._voyageService.min_prix &&
          v.itineraire.prixClassique <= this._voyageService.max_prix;
      }
    });

    // result
    this._voyageService.voyagesFilter = this._voyageService.voyages.filter((v) => { return voyagesFilterClass.includes(v) && voyagesFilterDate.includes && voyagesFilterSite.includes(v) && voyageFilterPrix.includes(v) })

  }

  ngOnInit() {
    this._voyageService.voyagesFilter = this._voyageService.voyages;
  }
}
