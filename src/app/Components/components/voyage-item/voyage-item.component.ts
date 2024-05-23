import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ShowVoyageDialogComponent } from '../../dialogs/show-voyage-dialog/show-voyage-dialog.component';
import { Voyage } from 'src/app/Models/voyage.interface';
import { DateTime } from 'src/app/Models/datetime.interface';

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

  constructor(
    private _matDialog: MatDialog,
    private _datePipe: DatePipe
  ) {

  }

  /**
   * Format date to string 
   * @param date 
   * @returns 
   */
  formatDate(date: Date): DateTime {

    // date section
    const day = this._datePipe.transform(date, 'EEE'); // Day of the week, abbreviated
    const dayNumber = this._datePipe.transform(date, 'dd'); // Day of the month, two digits
    const month = this._datePipe.transform(date, 'MMM'); // Month, abbreviated
    const year = this._datePipe.transform(date, 'yyyy'); // Year, full

    // time section
    const time = this._datePipe.transform(date, 'HH:mm'); // Hours and minutes

    let datetime = new DateTime();
    datetime.date = `${day}. ${dayNumber} ${month} ${year}`;
    datetime.time = time + ``;

    return datetime;
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
      }, minWidth: 600
    });
  }

  /**
   * Reconduct sme voyage to current voyage
   */
  reconduct() {
    alert("mark current voyage to receive information from another");
  }

  /**
   * Select current voyahe and go to reservation page
   */
  goToRservationPage() {
    alert("Select current voyage and go to reservation page");
  }

  ngOnInit() {
    console.log(this.voyage);

    this.dateDepart = new Date(this.voyage.dateDepart);
    this.dateArriver = new Date(this.voyage.dateDepart);
    this.dateArriver.setHours(this.dateArriver.getHours() + this.voyage.itineraire.duree);

    this.depart_datetime = this.formatDate(this.dateDepart);
    this.arriver_datetime = this.formatDate(this.dateArriver);
  }
}
