import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCheckComponent } from './task-check.component';

describe('TaskCheckComponent', () => {
  let component: TaskCheckComponent;
  let fixture: ComponentFixture<TaskCheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskCheckComponent]
    });
    fixture = TestBed.createComponent(TaskCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
