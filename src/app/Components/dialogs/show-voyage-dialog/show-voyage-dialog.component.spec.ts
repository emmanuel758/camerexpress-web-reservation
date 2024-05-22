import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVoyageDialogComponent } from './show-voyage-dialog.component';

describe('ShowVoyageDialogComponent', () => {
  let component: ShowVoyageDialogComponent;
  let fixture: ComponentFixture<ShowVoyageDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowVoyageDialogComponent]
    });
    fixture = TestBed.createComponent(ShowVoyageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
