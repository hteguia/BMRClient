import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseGridPageComponent } from './base-grid-page.component';

describe('BaseGridPageComponent', () => {
  let component: BaseGridPageComponent;
  let fixture: ComponentFixture<BaseGridPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaseGridPageComponent]
    });
    fixture = TestBed.createComponent(BaseGridPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
