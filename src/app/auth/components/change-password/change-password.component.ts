import { Component, Inject, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { LogService } from 'src/app/core/services/log.service';
import { PartnerModel } from 'src/app/users/models/partner.model';
import { PartnerService } from 'src/app/users/services/partner.service';
import { AuthService } from '../../services/auth.service';
import { confirmEqualValidator } from 'src/app/shared/validators/confirm-equal.validator';

export interface DialogData {
  data?: any,
  title: string
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, 
  public dialogRef: MatDialogRef<ChangePasswordComponent>,
  private formBuilder: FormBuilder) {

  }

  private logService = inject(LogService);
  private authService = inject(AuthService);
  
  mainForm!: FormGroup;
  passwordCtrl!:FormControl;
  confirmPasswordCtrl!:FormControl;
  loading = false; 
  title!: string;
  action$!: Observable<any>;

  ngOnInit(): void {
    this.title = this.data.title;
    this.initMainForm();
  }

  private initMainForm(){
    this.passwordCtrl = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.confirmPasswordCtrl = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.mainForm = this.formBuilder.group({
      email: new FormControl(this.data.data.email, Validators.required),
      token: new FormControl(this.data.data.token, Validators.required),
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl,
    }, {
      Validators: [confirmEqualValidator('password', 'confirmPassword')],
      updateOn: 'blur'
    });
  }

  onSubmitForm(){
    this.loading = true;
    
    this.authService.ResetPassword(this.mainForm.value).subscribe(
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
