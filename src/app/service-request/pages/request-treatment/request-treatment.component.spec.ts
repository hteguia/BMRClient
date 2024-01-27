import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTreatmentComponent } from './request-treatment.component';

describe('RequestTreatmentComponent', () => {
  let component: RequestTreatmentComponent;
  let fixture: ComponentFixture<RequestTreatmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestTreatmentComponent]
    });
    fixture = TestBed.createComponent(RequestTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
