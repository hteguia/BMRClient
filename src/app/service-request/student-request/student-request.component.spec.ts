import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRequestComponent } from './student-request.component';

describe('StudentRequestComponent', () => {
  let component: StudentRequestComponent;
  let fixture: ComponentFixture<StudentRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentRequestComponent]
    });
    fixture = TestBed.createComponent(StudentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
