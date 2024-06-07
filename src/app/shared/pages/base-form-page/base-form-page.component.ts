import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form-page',
  templateUrl: './base-form-page.component.html',
  styleUrls: ['./base-form-page.component.css']
})
export class BaseFormPageComponent {

  mainForm!: FormGroup;

  loading = false;

  

  protected resetForm(){
    this.mainForm.reset();
  }

  // protected  initFormControls(): void;

  // protected abstract initMainForm(): void;

  // protected abstract initObservables(): void;

  // protected abstract onSubmitForm(): void;
}
