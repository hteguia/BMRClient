import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentModelAddComponent } from './document-model-add.component';

describe('DocumentModelAddComponent', () => {
  let component: DocumentModelAddComponent;
  let fixture: ComponentFixture<DocumentModelAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentModelAddComponent]
    });
    fixture = TestBed.createComponent(DocumentModelAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
