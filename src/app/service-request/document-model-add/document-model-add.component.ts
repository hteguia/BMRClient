import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ServiceRequestService } from '../service.request.service';
import { BaseFormPageComponent } from 'src/app/shared/pages/base-form-page/base-form-page.component';
import {OnInit} from '@angular/core';
import { BaseFormPage } from 'src/app/shared/pages/BaseFormPage';
import { ActivatedRoute, Router } from '@angular/router';


export function toFormData( formValue: any ) {
  const formData = new FormData();

  for ( const key of Object.keys(formValue) ) {
    const value = formValue[key];
    formData.append(key, value);
  }

  return formData;
}


@Component({
  selector: 'app-document-model-add',
  templateUrl: './document-model-add.component.html',
  styleUrls: ['./document-model-add.component.css']
})
export class DocumentModelAddComponent extends BaseFormPage {
  
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router)
  {
    super();
  }
 
  
 
  private serviceRequestService = inject(ServiceRequestService);
  
  contentFileCtrl!: FormControl;
  nameCtrl!: FormControl;
  
  file: File | null = null;
  extension = ['pdf','zip','docx','xlsx']

  onFileChange(file: File){
    this.file = file;
  }

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();  
  }
  
  protected override  onSubmitForm() : void {
    const formData = toFormData(this.mainForm.value);
    formData.append('file', this.file!, this.file!.name);
    this.serviceRequestService.addDoumentModel(formData).subscribe(
      (response) =>{
        this.loading = false;
        this.resetForm();              
      },
      (error) =>{
        Object.keys(error.error).forEach(prop => {
          const formControl = this.mainForm.get('name');
          if (formControl) {
            formControl.setErrors({
              serverError: error.error[prop]
            });
          }
        });
      }
    )
  }

  protected override initMainForm(){
    this.mainForm = this.formBuilder.group({
      name: this.nameCtrl,
      contentFile: this.contentFileCtrl
    });
  }

  protected override initFormControls() : void {
    this.nameCtrl = this.formBuilder.control('');
  }
  

  
}
