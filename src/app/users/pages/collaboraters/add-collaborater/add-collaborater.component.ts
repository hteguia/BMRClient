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
        console.log(this.data);
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

  loading = false;

  ngOnInit(): void {
    /*
    this.route.data.subscribe(data => {
      console.log("ssfsdfds "+data['firstName']);
      this.data=data;
    })
    */
  
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
      firstName: this.firstNameCtrl,
      lastName: this.lastNameCtrl,
      phoneNumber: this.phoneNumberCtrl,
      email: this.emailCtrl,
      role: this.roleCtrl,
    });
  }

  private initFormControl(){
    this.firstNameCtrl = this.formBuilder.control(this.data?.firstName, Validators.required);
    this.lastNameCtrl = this.formBuilder.control('', Validators.required);
    this.phoneNumberCtrl = this.formBuilder.control('', Validators.required);
    this.emailCtrl = this.formBuilder.control('', [Validators.required, Validators.email]);
    this.roleCtrl = this.formBuilder.control('', Validators.required);
  }

  onSubmitForm(){
    console.log(this.mainForm.value);
    this.collaboraterService.addCollaborater(this.mainForm.value).subscribe(result=>{
      this.loading = false;
      if(result) {
         this.resetForm();
      }
      else{
        console.error('Echec de l\'enregistrement');
      }
    });
  }

  private setFormData(){
    this.firstNameCtrl.setValue('dsfsdf');
  }

  private resetForm(){
    this.mainForm.reset();
  }
}


