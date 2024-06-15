import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceRequestService } from '../service.request.service';
import { BaseFormPageComponent } from 'src/app/shared/pages/base-form-page/base-form-page.component';
import {OnInit} from '@angular/core';
import { BaseFormPage } from 'src/app/shared/pages/BaseFormPage';
import { ActivatedRoute, Router } from '@angular/router';
import { startWith } from 'rxjs';
import { toFormData } from '../service-request.model';





@Component({
  selector: 'app-document-model-add',
  templateUrl: './document-model-add.component.html',
  styleUrls: ['./document-model-add.component.css']
})
export class DocumentModelAddComponent extends BaseFormPage {
  
  constructor(formBuilder: FormBuilder, route: ActivatedRoute, router: Router)
  {
    super(router, route, formBuilder);
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

    this.contentFileCtrl.valueChanges.pipe(startWith('')).subscribe((file: File) => {console.log(file.name)});
  }
  
  protected override  onSubmitForm() : void {
    const formData = toFormData(this.mainForm.value);
    formData.append('file', this.contentFileCtrl.value);
    this.serviceRequestService.addDoumentModel(formData).subscribe(
      (response) =>{
        this.loading = false;
        this.resetForm(); 
        this.router.navigateByUrl(`service-request/document-template`);              
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
      file: this.contentFileCtrl
    });
  }

  protected override initFormControls() : void {
    this.nameCtrl = this.formBuilder.control('', Validators.required);
    this.contentFileCtrl = this.formBuilder.control('', Validators.required);
  }
  

  
}
