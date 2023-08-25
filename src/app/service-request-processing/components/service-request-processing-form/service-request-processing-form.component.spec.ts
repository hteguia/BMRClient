import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestProcessingFormComponent } from './service-request-processing-form.component';

describe('ServiceRequestProcessingFormComponent', () => {
  let component: ServiceRequestProcessingFormComponent;
  let fixture: ComponentFixture<ServiceRequestProcessingFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceRequestProcessingFormComponent]
    });
    fixture = TestBed.createComponent(ServiceRequestProcessingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
