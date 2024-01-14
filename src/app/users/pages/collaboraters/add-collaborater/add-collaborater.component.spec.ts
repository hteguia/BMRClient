import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollaboraterComponent } from './add-collaborater.component';

describe('AddCollaboraterComponent', () => {
  let component: AddCollaboraterComponent;
  let fixture: ComponentFixture<AddCollaboraterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCollaboraterComponent]
    });
    fixture = TestBed.createComponent(AddCollaboraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
