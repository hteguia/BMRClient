import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTreatmentListComponent } from './request-treatment-list.component';

describe('RequestTreatmentListComponent', () => {
  let component: RequestTreatmentListComponent;
  let fixture: ComponentFixture<RequestTreatmentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestTreatmentListComponent]
    });
    fixture = TestBed.createComponent(RequestTreatmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
