import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CollaboraterService } from '../../../services/collaborater.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleModel } from '../../../models/role.model';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-add-collaborater',
  templateUrl: './add-collaborater.component.html',
  styleUrls: ['./add-collaborater.component.css']
})
export class AddCollaboraterComponent {
  constructor(private formBuilder: FormBuilder,
    private collaboraterService: CollaboraterService, private route: ActivatedRoute,
    private router: Router)
  {
      if(this.router.getCurrentNavigation()){
        this.data = this.router.getCurrentNavigation()!.extras!.state;
      }
  }

  data!:any;
  listRoles$!: Observable<RoleModel[]> 
  
  mainForm!: FormGroup;

  idCtrl!: FormControl;
  firstNameCtrl!: FormControl;
  lastNameCtrl!: FormControl;
  phoneNumberCtrl!: FormControl;
  emailCtrl!: FormControl;
  roleCtrl!: FormControl;

  action$!: Observable<any>;

  loading = false;

  ngOnInit(): void {
    this.initFormControl();
    this.initMainForm();

    this.listRoles$ = this.route.data.pipe(
      map(data => data['data'])
    )
    
    if(this.data){
      this.setFormData()
    }
    
  }

  private initMainForm(){
    this.mainForm = this.formBuilder.group({
      id: this.idCtrl,
      firstName: this.firstNameCtrl,
      lastName: this.lastNameCtrl,
      phoneNumber: this.phoneNumberCtrl,
      email: this.emailCtrl,
      role: this.roleCtrl,
    });
  }

  private initFormControl(){
    this.idCtrl = this.formBuilder.control(this.data?.id)
    this.firstNameCtrl = this.formBuilder.control(this.data?.firstName, Validators.required);
    this.lastNameCtrl = this.formBuilder.control(this.data?.lastName, Validators.required);
    this.phoneNumberCtrl = this.formBuilder.control(this.data?.phoneNumber, Validators.required);
    this.emailCtrl = this.formBuilder.control(this.data?.email, [Validators.required, Validators.email]);
    this.roleCtrl = this.formBuilder.control(this.data?.roleId, Validators.required);
  }

  onSubmitForm(){
    this.action$ = this.mainForm.value.id === null ? this.collaboraterService.addCollaborater(this.mainForm.value) :
                                            this.collaboraterService.updateCollaborater(this.mainForm.value);

    this.action$.subscribe(
      (response) =>{
        this.loading = false;
        this.resetForm();
      },
      (error) =>{
        Object.keys(error.error).forEach(prop => {
          const formControl = this.mainForm.get('name');
          //this.logService.log(formControl)
          if (formControl) {
            // activate the error message
            formControl.setErrors({
              serverError: error.error[prop]
            });
          }
        });
      }
    )
  }

  private setFormData(){
    this.idCtrl.setValue(this.data?.id);
    this.firstNameCtrl.setValue(this.data?.firstName);
    this.lastNameCtrl.setValue(this.data?.lastName);
    this.phoneNumberCtrl.setValue(this.data?.phoneNumber);
    this.emailCtrl.setValue(this.data?.email);
    this.roleCtrl.setValue(this.data?.roleId);
  }

  private resetForm(){
    this.mainForm.reset();
  }
}


