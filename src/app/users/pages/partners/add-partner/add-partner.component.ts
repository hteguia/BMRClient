import { Component, Inject, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { LogService } from 'src/app/core/services/log.service';
import { PartnerModel } from 'src/app/users/models/partner.model';
import { PartnerService } from 'src/app/users/services/partner.service';

export interface DialogData {
  data?: PartnerModel,
  title: string
}

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.css'],
})
export class AddPartnerComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, 
  public dialogRef: MatDialogRef<AddPartnerComponent>,
  private formBuilder: FormBuilder, private partnerService: PartnerService) {

  }

  private logService = inject(LogService);
  
  mainForm!: FormGroup;
  loading = false; 
  title!: string;
  action$!: Observable<any>;

  ngOnInit(): void {
    this.title = this.data.title;
    this.initMainForm();
  }

  private initMainForm(){
    this.mainForm = this.formBuilder.group({
      id: this.formBuilder.control(this.data.data?.id),
      name: this.formBuilder.control(this.data.data?.name, Validators.required),
    });
  }

  onSubmitForm(){
    this.loading = true;
    this.action$ = this.mainForm.value.id === null ? 
                   this.partnerService.addPartner(this.mainForm.value) :
                   this.partnerService.updatePartner(this.mainForm.value);
                   
    this.action$.subscribe(
      (response) =>{
        this.loading = false;
        this.resetForm();
        this.dialogRef.close("RELOAD_GRID");
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

  getFormControlErrorText(ctrl: AbstractControl){
    if(ctrl.hasError('required')){
      return 'Ce champs est obligatoire';
    }
    else if (ctrl.hasError('serverError')) {
      return ctrl.errors?.['serverError'];
    }
    else
    {
      return 'Ce champs contient une erreur';
    }
  }

  private resetForm(){
    this.mainForm.reset();
  }
}
