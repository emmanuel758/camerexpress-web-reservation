import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gerer-reservation',
  templateUrl: './gerer-reservation.component.html',
  styleUrls: ['./gerer-reservation.component.css']
})
export class GererReservationComponent {
  constructor(
    protected _router:Router
  ){}
}
