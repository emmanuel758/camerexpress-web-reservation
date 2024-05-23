import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Voyage } from 'src/app/Models/voyage.interface';

@Component({
  selector: 'app-show-voyage-dialog',
  templateUrl: './show-voyage-dialog.component.html',
  styleUrls: ['./show-voyage-dialog.component.css']
})
export class ShowVoyageDialogComponent {

  // voyage to display informations
  voyage: Voyage = new Voyage();
  dateDepart = "";
  dateDestinaition = "";
  siteName = "";
  arrets = "";

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.voyage = data.voyage;

    // format dates
    let currentDate: Date = new Date(this.voyage.dateDepart);
    let finalDate: Date = new Date(this.voyage.dateDepart);
    finalDate.setHours(currentDate.getHours() + this.voyage.itineraire.duree);

    this.dateDepart = currentDate.toDateString();
    this.dateDestinaition = finalDate.toDateString();

    // parse site name
    this.siteName = this.voyage.itineraire.site.agence.nom + '(' + this.voyage.itineraire.site.quartier + ')';

    // parse arrets
    // this.arrets = this.voyage.itineraire.arrets.replace(',', ' - ');
  }
}
