import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestProcessingDetailComponent } from './service-request-processing-detail.component';

describe('ServiceRequestProcessingDetailComponent', () => {
  let component: ServiceRequestProcessingDetailComponent;
  let fixture: ComponentFixture<ServiceRequestProcessingDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceRequestProcessingDetailComponent]
    });
    fixture = TestBed.createComponent(ServiceRequestProcessingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
