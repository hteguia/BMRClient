import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListRequestComponent } from './student-list-request.component';

describe('StudentListRequestComponent', () => {
  let component: StudentListRequestComponent;
  let fixture: ComponentFixture<StudentListRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentListRequestComponent]
    });
    fixture = TestBed.createComponent(StudentListRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
