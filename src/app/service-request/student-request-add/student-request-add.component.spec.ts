import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRequestAddComponent } from './student-request-add.component';

describe('StudentRequestAddComponent', () => {
  let component: StudentRequestAddComponent;
  let fixture: ComponentFixture<StudentRequestAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentRequestAddComponent]
    });
    fixture = TestBed.createComponent(StudentRequestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
