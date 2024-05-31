import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessReservationDiaogComponent } from './success-reservation-diaog.component';

describe('SuccessReservationDiaogComponent', () => {
  let component: SuccessReservationDiaogComponent;
  let fixture: ComponentFixture<SuccessReservationDiaogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessReservationDiaogComponent]
    });
    fixture = TestBed.createComponent(SuccessReservationDiaogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
