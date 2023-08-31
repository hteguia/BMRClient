import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCloseCardComponent } from './button-close-card.component';

describe('ButtonCloseCardComponent', () => {
  let component: ButtonCloseCardComponent;
  let fixture: ComponentFixture<ButtonCloseCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonCloseCardComponent]
    });
    fixture = TestBed.createComponent(ButtonCloseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
