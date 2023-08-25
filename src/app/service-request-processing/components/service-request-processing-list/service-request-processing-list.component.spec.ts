import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceRequestProcessingListComponent } from './service-request-processing-list.component';

describe('ServiceRequestProcessingListComponent', () => {
  let component: ServiceRequestProcessingListComponent;
  let fixture: ComponentFixture<ServiceRequestProcessingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceRequestProcessingListComponent]
    });
    fixture = TestBed.createComponent(ServiceRequestProcessingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
