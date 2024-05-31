import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateTime } from 'src/app/Models/datetime.interface';
import { Voyage } from 'src/app/Models/voyage.interface';
import { DatetimeService } from 'src/app/Services/Datetime/datetime.service';

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
    private _datetimeService: DatetimeService
  ) {

  }

  ngOnInit() {
    this.voyage = this.data.voyage;

    // format dates
    let currentDate: Date = new Date(this.voyage.dateDepart);
    let finalDate: Date = new Date(this.voyage.dateDepart);
    finalDate.setHours(currentDate.getHours() + this.voyage.itineraire.duree);

    let depart_datetime: DateTime = this._datetimeService.formatDate(currentDate);
    let arriver_datetime: DateTime = this._datetimeService.formatDate(finalDate);

    this.dateDepart = depart_datetime.date + ' - ' + depart_datetime.time;
    this.dateDestinaition = arriver_datetime.date + ' - ' + arriver_datetime.time;

    // parse site name
    this.siteName = this.voyage.itineraire.site.agence.nom + '(' + this.voyage.itineraire.site.quartier + ')';

    // parse arrets
    // this.arrets = this.voyage.itineraire.arrets.replace(',', ' - ');
  }
}
