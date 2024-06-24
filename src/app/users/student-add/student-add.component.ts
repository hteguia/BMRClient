import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BaseFormPage } from 'src/app/shared/pages/BaseFormPage';
import { PartnerModel } from '../users.model';
import { UsersService } from '../users.service';
import { phoneNumberValidator } from 'src/app/shared/validators/phone-number.validator';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent extends BaseFormPage{
  constructor(formBuilder: FormBuilder,
    private usersService: UsersService, route: ActivatedRoute,
    router: Router)
  {
    super(router, route, formBuilder);
      if(this.router.getCurrentNavigation()){
        this.data = this.router.getCurrentNavigation()!.extras!.state;
      }
  }

  data!:any;
  listPartner$!: Observable<PartnerModel[]> 

  listFaculty=[
    {id:"ISTM", name:"ISTM (INSTITUT SUPÉRIEUR DES TECHNOLOGIES MEDICALE)"},
    {id:"FMBS", name:"FMSB (FACULTÉ DE MÉDECINE ET DES SCIENCES BIOMÉDICALES DE YAOUNDÉ)"},
    {id:"FMSP", name:"FMSP (FACULTÉ DE MÉDECINE ET DES SCIENCES PHARMACEUTIQUES DE DOUALA)"},
    {id:"UB", name:"UB (UNIVERSITÉ DE BUEA)"},
    {id:"FHS", name:"FHS (FACULTY OF HEALTH SCIENCES UNIVERSITY OF BUEA)"},
    {id:"UBa", name:"UBa"},
    {id:"AUTRES", name:"AUTRES"},
  ]

  listCategory=[
    {id:"ETUDIANT", name:"ETUDIANT"},
    {id:"GENERALISTE", name:"GENERALISTE"},
    {id:"RESIDANT", name:"RESIDANT"},
    {id:"SPECIALISTE", name:"SPECIALISTE"},
    {id:"AUTRES", name:"AUTRES"},
  ]
  


  idCtrl!: FormControl;
  firstNameCtrl!: FormControl;
  lastNameCtrl!: FormControl;
  phoneNumberCtrl!: FormControl;
  emailCtrl!: FormControl;
  facultyCtrl!: FormControl;
  categoryCtrl!: FormControl;
  partnerIdCtrl!: FormControl;

  action$!: Observable<any>;



  ngOnInit(): void {
    this.initFormControl();
    this.initMainForm();

    this.listPartner$ = this.route.data.pipe(
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
      faculty: this.facultyCtrl,
      category: this.categoryCtrl,
      partnerId: this.partnerIdCtrl,
    });
  }

  private initFormControl(){
    this.idCtrl = this.formBuilder.control(this.data?.id)
    this.firstNameCtrl = this.formBuilder.control(this.data?.firstName, Validators.required);
    this.lastNameCtrl = this.formBuilder.control(this.data?.lastName, Validators.required);
    this.phoneNumberCtrl = this.formBuilder.control(this.data?.phoneNumber, [Validators.required, phoneNumberValidator]);
    this.emailCtrl = this.formBuilder.control(this.data?.email, [Validators.required, Validators.email]);
    this.facultyCtrl = this.formBuilder.control(this.data?.faculty, Validators.required);
    this.categoryCtrl = this.formBuilder.control(this.data?.category, Validators.required);
    this.partnerIdCtrl = this.formBuilder.control(this.data?.partnerId);
  }

  protected override onSubmitForm(){
    this.loading = true;
    this.action$ = this.mainForm.value.id === null ? this.usersService.addStudent(this.mainForm.value) :
                                            this.usersService.updateStudent(this.mainForm.value);

    this.action$.subscribe(
      (response) =>{
        this.loading = false;
        this.resetForm();
        this.router.navigateByUrl('/user/student');
      },
      (error) =>{
        this.loading = false;
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
    this.router.navigateByUrl('/user/student');
  }

  private setFormData(){
    this.idCtrl.setValue(this.data?.id);
    this.firstNameCtrl.setValue(this.data?.firstName);
    this.lastNameCtrl.setValue(this.data?.lastName);
    this.phoneNumberCtrl.setValue(this.data?.phoneNumber);
    this.emailCtrl.setValue(this.data?.email);
    this.facultyCtrl.setValue(this.data?.faculty);
    this.categoryCtrl.setValue(this.data?.category);
    this.partnerIdCtrl.setValue(this.data?.partnerId);
  }

  protected override resetForm(){
    this.mainForm.reset();
  }

  public phoneNumberChange(data: {isInvalid: boolean, value: string}){
    if(data.value === undefined){

    }
    else if(data.isInvalid){
      
    }
    else{
      this.phoneNumberCtrl.setValue(data.value);
    }
    //this.phoneNumberCtrl.setErrors({serverError:"true"});
  }

  hasError( field: string, error: string ) {
    return this.phoneNumberCtrl.dirty && this.phoneNumberCtrl.hasError(error);
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
}
