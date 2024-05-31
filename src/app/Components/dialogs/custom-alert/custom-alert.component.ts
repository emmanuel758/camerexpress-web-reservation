import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.css']
})
export class CustomAlertComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  title = this.data.title;
  message = this.data.message;
  /**
   * TYPE
   * 
   * success
   * error
   */
  type = this.data.type;
  code = this.data.code;
}
