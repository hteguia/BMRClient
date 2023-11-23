import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceSmsComponent } from './balance-sms.component';

describe('BalanceSmsComponent', () => {
  let component: BalanceSmsComponent;
  let fixture: ComponentFixture<BalanceSmsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BalanceSmsComponent]
    });
    fixture = TestBed.createComponent(BalanceSmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
