import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTreatmentResultComponent } from './request-treatment-result.component';

describe('RequestTreatmentResultComponent', () => {
  let component: RequestTreatmentResultComponent;
  let fixture: ComponentFixture<RequestTreatmentResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestTreatmentResultComponent]
    });
    fixture = TestBed.createComponent(RequestTreatmentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
