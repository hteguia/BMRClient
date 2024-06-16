import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboraterAddComponent } from './collaborater-add.component';

describe('AddCollaboraterComponent', () => {
  let component: CollaboraterAddComponent;
  let fixture: ComponentFixture<CollaboraterAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollaboraterAddComponent]
    });
    fixture = TestBed.createComponent(CollaboraterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
