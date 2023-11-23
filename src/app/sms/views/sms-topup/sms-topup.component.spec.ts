import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsTopupComponent } from './sms-topup.component';

describe('SmsTopupComponent', () => {
  let component: SmsTopupComponent;
  let fixture: ComponentFixture<SmsTopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SmsTopupComponent]
    });
    fixture = TestBed.createComponent(SmsTopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
