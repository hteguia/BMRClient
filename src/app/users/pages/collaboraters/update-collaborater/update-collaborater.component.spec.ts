import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCollaboraterComponent } from './update-collaborater.component';

describe('UpdateCollaboraterComponent', () => {
  let component: UpdateCollaboraterComponent;
  let fixture: ComponentFixture<UpdateCollaboraterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCollaboraterComponent]
    });
    fixture = TestBed.createComponent(UpdateCollaboraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
