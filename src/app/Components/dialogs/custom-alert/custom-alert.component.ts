import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reservation } from 'src/app/Models/reservation.interface';
import { PdfService } from 'src/app/Services/Pdf/pdf.service';
import { PressePapierService } from 'src/app/Services/Presse-papier/presse-papier.service';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.css']
})
export class CustomAlertComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _pressepapierService: PressePapierService,
    private _pdfService: PdfService
  ) { }

  title = this.data.title;
  message = this.data.message;
  /**
   * TYPE
   * 
   * success
   * error
   */
  type = this.data.type;
  reservation: Reservation = this.data.reservation;

  copyToClipboard() {
    this._pressepapierService.copier(this.reservation.code);
  }

  ngOnInit() {
    let now = new Date();
    this._pdfService.generatePdf('ticket-ID', 'CM-ticket-' + now.getTime());
  }
}
