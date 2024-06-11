import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckReservationFormComponent } from './check-reservation-form.component';

describe('CheckReservationFormComponent', () => {
  let component: CheckReservationFormComponent;
  let fixture: ComponentFixture<CheckReservationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckReservationFormComponent]
    });
    fixture = TestBed.createComponent(CheckReservationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
