import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShowVoyageDialogComponent } from '../../dialogs/show-voyage-dialog/show-voyage-dialog.component';
import { Voyage } from 'src/app/Models/voyage.interface';

@Component({
  selector: 'app-voyage-item',
  templateUrl: './voyage-item.component.html',
  styleUrls: ['./voyage-item.component.css']
})
export class VoyageItemComponent {

  /**
   * Voyage 
   */
  @Input("voyage") voyage!: Voyage | null;

  constructor(
    private _matDialog: MatDialog
  ) { }

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
}
