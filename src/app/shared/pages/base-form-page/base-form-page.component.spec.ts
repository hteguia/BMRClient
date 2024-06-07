import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFormPageComponent } from './base-form-page.component';

describe('BaseFormPageComponent', () => {
  let component: BaseFormPageComponent;
  let fixture: ComponentFixture<BaseFormPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseFormPageComponent]
    });
    fixture = TestBed.createComponent(BaseFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
