import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererReservationComponent } from './gerer-reservation.component';

describe('GererReservationComponent', () => {
  let component: GererReservationComponent;
  let fixture: ComponentFixture<GererReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GererReservationComponent]
    });
    fixture = TestBed.createComponent(GererReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
