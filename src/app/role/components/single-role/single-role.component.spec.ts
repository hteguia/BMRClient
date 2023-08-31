import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRoleComponent } from './single-role.component';

describe('SingleRoleComponent', () => {
  let component: SingleRoleComponent;
  let fixture: ComponentFixture<SingleRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleRoleComponent]
    });
    fixture = TestBed.createComponent(SingleRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
