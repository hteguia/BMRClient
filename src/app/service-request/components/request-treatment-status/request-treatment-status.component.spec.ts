import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTreatmentStatusComponent } from './request-treatment-status.component';

describe('RequestTreatmentStatusComponent', () => {
  let component: RequestTreatmentStatusComponent;
  let fixture: ComponentFixture<RequestTreatmentStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestTreatmentStatusComponent]
    });
    fixture = TestBed.createComponent(RequestTreatmentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
