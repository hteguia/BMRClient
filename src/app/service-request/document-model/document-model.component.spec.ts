import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentModelComponent } from './document-model.component';

describe('DocumentModelComponent', () => {
  let component: DocumentModelComponent;
  let fixture: ComponentFixture<DocumentModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentModelComponent]
    });
    fixture = TestBed.createComponent(DocumentModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
