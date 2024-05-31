import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.css']
})
export class FormSectionComponent {
  @Input() number!: string;
  @Input() title!: string;

}
