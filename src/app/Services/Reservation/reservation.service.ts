import { Injectable } from '@angular/core';
import { Voyage } from 'src/app/Models/voyage.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }

  // voyage selectionner pour la reservation
  selected_voyage!: Voyage;

  // passagers number
  passagers_adultes: number = 0;
  passagers_enfant: number = 0;

  // passagers arrays
  passagers_adultes_array: string[] = [];
  passagers_enfant_array: string[] = [];

  // display text label
  passagers_adultes_text!: string;
  passagers_enfant_text!: string;
  passagers_text!: string;

  updatePassagersText() {
    this.passagers_adultes_text = this.passagers_adultes > 0 ? this.passagers_adultes + " Adulte(s)" : "";
    this.passagers_enfant_text = this.passagers_enfant > 0 ? ", " + this.passagers_enfant + " enfant(s)" : "";
    this.passagers_text = this.passagers_adultes_text + this.passagers_enfant_text;
  }

  /**
   * Ajouter un passager adulte
   */
  add_passager_adulte() {
    if (this.passagers_adultes < 10) {
      this.passagers_adultes++;
    }

    // update text
    this.updatePassagersText();
  }

  /**
   * retirer un passager adulte
   */
  reduce_passager_adulte() {
    if (this.passagers_adultes > 0) {
      this.passagers_adultes--;
    }

    // update text
    this.updatePassagersText();
  }

  /**
   * Ajouter un passsager enfant
   */
  add_passager_enfant() {
    if (this.passagers_enfant < 10) {
      this.passagers_enfant++;
    }

    // update text
    this.updatePassagersText();
  }

  /**
   * Reduire passager enfant
   */
  reduce_passager_enfant() {
    if (this.passagers_enfant > 0) {
      this.passagers_enfant--;
    }

    // update text
    this.updatePassagersText();
  }
}
