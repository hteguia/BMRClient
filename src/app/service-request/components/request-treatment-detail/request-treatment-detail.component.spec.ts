import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTreatmentDetailComponent } from './request-treatment-detail.component';

describe('RequestTreatmentDetailComponent', () => {
  let component: RequestTreatmentDetailComponent;
  let fixture: ComponentFixture<RequestTreatmentDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestTreatmentDetailComponent]
    });
    fixture = TestBed.createComponent(RequestTreatmentDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
