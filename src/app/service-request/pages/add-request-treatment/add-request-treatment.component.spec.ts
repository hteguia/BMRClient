import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestTreatmentComponent } from './add-request-treatment.component';

describe('AddRequestTreatmentComponent', () => {
  let component: AddRequestTreatmentComponent;
  let fixture: ComponentFixture<AddRequestTreatmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRequestTreatmentComponent]
    });
    fixture = TestBed.createComponent(AddRequestTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
