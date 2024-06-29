import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { BaseFormPage } from 'src/app/shared/pages/BaseFormPage';
import { RoleModel } from '../users.model';
import { UsersService } from '../users.service';
import { phoneNumberValidator } from 'src/app/shared/validators/phone-number.validator';

@Component({
  selector: 'app-collaborater-add',
  templateUrl: './collaborater-add.component.html',
  styleUrls: ['./collaborater-add.component.css'],
  animations:[
    trigger('pricingInfo', [
      state('default', style({
        transform: 'scale(1)',
        'background-color': 'white',
        'z-index': 1
      })),
      transition('void => *',
      [
        style({
          transform: 'translateY(0)',
          opacity: 1,
          'z-index': 1
        }),
        animate('300ms ease-out', style({
          transform: 'translateY(-20%)',
          opacity: 0,
          'background-color': 'white',
          'z-index': 1
        }))
      ])
    ])
  ]
})
export class CollaboraterAddComponent extends BaseFormPage{

  private usersService = inject(UsersService);

  constructor(router: Router, route: ActivatedRoute, formBuilder: FormBuilder)
  {
    super(router, route, formBuilder)
      if(this.router.getCurrentNavigation()){
        this.data = this.router.getCurrentNavigation()!.extras!.state;
      }
  }

  data!:any;
  listRoles$!: Observable<RoleModel[]> 
  

  idCtrl!: FormControl;
  firstNameCtrl!: FormControl;
  lastNameCtrl!: FormControl;
  phoneNumberCtrl!: FormControl;
  emailCtrl!: FormControl;
  roleCtrl!: FormControl;
  serviceRequestNotifyCtrl!: FormControl;

  action$!: Observable<any>;


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

  protected override initMainForm(){
    this.mainForm = this.formBuilder.group({
      id: this.idCtrl,
      firstName: this.firstNameCtrl,
      lastName: this.lastNameCtrl,
      phoneNumber: this.phoneNumberCtrl,
      email: this.emailCtrl,
      role: this.roleCtrl,
      serviceRequestNotify: this.serviceRequestNotifyCtrl
    });
  }

  private initFormControl(){
    this.idCtrl = this.formBuilder.control(this.data?.id)
    this.firstNameCtrl = this.formBuilder.control(this.data?.firstName, Validators.required);
    this.lastNameCtrl = this.formBuilder.control(this.data?.lastName, Validators.required);
    this.phoneNumberCtrl = this.formBuilder.control(this.data?.phoneNumber, [Validators.required, phoneNumberValidator]);
    this.emailCtrl = this.formBuilder.control(this.data?.email, [Validators.required, Validators.email]);
    this.roleCtrl = this.formBuilder.control(this.data?.roleId, Validators.required);
    this.serviceRequestNotifyCtrl = this.formBuilder.control(false);
  }

  protected override onSubmitForm(){
    this.loading = true;
    this.action$ = this.usersService.addCollaborater(this.mainForm.value);
    if(this.idCtrl.value != null && this.idCtrl.value != undefined && this.idCtrl.value != 0){
      this.action$ = this.usersService.updateCollaborater(this.mainForm.value);
    }

    this.action$.subscribe(
      (response) =>{
        this.loading = false;
        this.resetForm();
        this.router.navigateByUrl('/user/collaborater');
      },
      (error) =>{
        this.loading = false;
        //console.log("error "+error);
        Object.keys(error.error).forEach(prop => {
          const formControl = this.mainForm.get(prop.toLowerCase());
          if (formControl) {
            formControl.setErrors({
              serverError: error.error[prop]
            });
          }
        });
      }
    )
  }

  onCancel(){
    this.resetForm();
    this.router.navigateByUrl('/user/collaborater');
  }

  private setFormData(){
    this.idCtrl.setValue(this.data?.id);
    this.firstNameCtrl.setValue(this.data?.firstName);
    this.lastNameCtrl.setValue(this.data?.lastName);
    this.phoneNumberCtrl.setValue(this.data?.phoneNumber);
    this.emailCtrl.setValue(this.data?.email);
    this.roleCtrl.setValue(this.data?.roleId);
  }

  protected override resetForm(){
    this.mainForm.reset();
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

  showOptions(event:any): void {
    console.log(event.checked);
  }
}


