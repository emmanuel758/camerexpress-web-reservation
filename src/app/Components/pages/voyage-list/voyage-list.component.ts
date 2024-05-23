import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VoyageService } from 'src/app/Services/Voyage/voyage.service';

@Component({
  selector: 'app-voyage-list',
  templateUrl: './voyage-list.component.html',
  styleUrls: ['./voyage-list.component.css']
})
export class VoyageListComponent {

  constructor(
    protected _voyageService: VoyageService,
    private _router: Router,
    private _location: Location
  ) { }

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
    this._location.back();
  }
}
