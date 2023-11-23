import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSmsTopupComponent } from './add-sms-topup.component';

describe('AddSmsTopupComponent', () => {
  let component: AddSmsTopupComponent;
  let fixture: ComponentFixture<AddSmsTopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSmsTopupComponent]
    });
    fixture = TestBed.createComponent(AddSmsTopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
