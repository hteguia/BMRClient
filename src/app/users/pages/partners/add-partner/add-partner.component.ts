import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
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
  private formBuilder: FormBuilder, private partnerService: PartnerService) {}

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
    console.log(this.mainForm.value);
    this.loading = true;
    this.action$ = this.mainForm.value.id ? this.partnerService.addPartner(this.mainForm.value) :
                                            this.partnerService.updatePartner(this.mainForm.value);
    this.action$.subscribe(result=>{
      this.loading = false;
      if(result) {
         this.resetForm();
         this.dialogRef.close();
      }
      else{
        console.error('Echec de l\'enregistrement');
      }
    });
  }

  private resetForm(){
    this.mainForm.reset();
  }
}
