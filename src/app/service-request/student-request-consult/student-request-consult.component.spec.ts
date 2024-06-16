import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRequestConsultComponent } from './student-request-consult.component';

describe('StudentRequestConsultComponent', () => {
  let component: StudentRequestConsultComponent;
  let fixture: ComponentFixture<StudentRequestConsultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentRequestConsultComponent]
    });
    fixture = TestBed.createComponent(StudentRequestConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
