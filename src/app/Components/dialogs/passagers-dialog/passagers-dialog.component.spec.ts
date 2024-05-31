import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassagersDialogComponent } from './passagers-dialog.component';

describe('PassagersDialogComponent', () => {
  let component: PassagersDialogComponent;
  let fixture: ComponentFixture<PassagersDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassagersDialogComponent]
    });
    fixture = TestBed.createComponent(PassagersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
