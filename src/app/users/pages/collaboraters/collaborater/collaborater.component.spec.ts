import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboraterComponent } from './collaborater.component';

describe('CollaboraterComponent', () => {
  let component: CollaboraterComponent;
  let fixture: ComponentFixture<CollaboraterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollaboraterComponent]
    });
    fixture = TestBed.createComponent(CollaboraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
