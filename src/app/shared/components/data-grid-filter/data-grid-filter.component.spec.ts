import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGridFilterComponent } from './data-grid-filter.component';

describe('DataGridFilterComponent', () => {
  let component: DataGridFilterComponent;
  let fixture: ComponentFixture<DataGridFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataGridFilterComponent]
    });
    fixture = TestBed.createComponent(DataGridFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
