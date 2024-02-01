import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultRequestTreatmentComponent } from './consult-request-treatment.component';

describe('ConsultRequestTreatmentComponent', () => {
  let component: ConsultRequestTreatmentComponent;
  let fixture: ComponentFixture<ConsultRequestTreatmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultRequestTreatmentComponent]
    });
    fixture = TestBed.createComponent(ConsultRequestTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
