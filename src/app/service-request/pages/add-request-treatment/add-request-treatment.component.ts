import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest, map, of, startWith } from 'rxjs';
import { requiredFileTypeValidator } from 'src/app/shared/validators/required-file-type.validator';
import { PartnerModel } from 'src/app/users/models/partner.model';
import { RequestTreatmentService } from '../../services/request-treatment.service';
import { LogService } from 'src/app/core/services/log.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { StorageService } from 'src/app/core/services/storage.service';
import { AuthService } from 'src/app/auth/services/auth.service';

export function toFormData( formValue: any ) {
  const formData = new FormData();

  for ( const key of Object.keys(formValue) ) {
    const value = formValue[key];
    formData.append(key, value);
  }

  return formData;
}

@Component({
  selector: 'app-add-request-treatment',
  templateUrl: './add-request-treatment.component.html',
  styleUrls: ['./add-request-treatment.component.css'],
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
export class AddRequestTreatmentComponent {
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router)
  {
     
  }

  private requestTreatmentService = inject(RequestTreatmentService);
  private logService = inject(LogService);
  private authService = inject(AuthService);

  loading = false;
  mainForm!: FormGroup;
  serviceTypeCtrl!: FormControl;
  contentFileCtrl!: FormControl;
  deadlineCtrl!: FormControl;
  file: File | null = null;
  extension = ['pdf','zip','docx','xlsx']
  deadLineList = [
    { id:"24 Heures", name:"24 Heures" },
    { id:"48 Heures", name:"48 Heures" },
    { id:"72 Heures", name:"72 Heures" },
    { id:"5 Jours", name:"5 Jours" },
    { id:"1 Semaine", name:"1 Semaine" },
    { id:"2 Semaines", name:"2 Semaines" },
    { id:"1 Mois", name:"1 Mois" },
    { id:"+1 Mois", name:"+1 Mois" }
  ]

  listPartner$!: Observable<PartnerModel[]> 

  listItemAnimateState = 'default';
  pricing = "";
  showPricing$!: Observable<boolean>;
  servicePricings$!: Observable<ServicePricing[]>;
  id!: string
  currentUser!: any;
  ngOnInit(): void {  
    this.id = this.route.snapshot.paramMap.get('id')!
    console.log("this.id "+this.id);
    this.listPartner$ = this.route.data.pipe(
      map(data => data['data'])
    )
    
   this.initFormControls();
   this.initMainForm();  
   this.initObservables(); 
   
   this.currentUser = this.authService.userProfil;
  }

  initMainForm(){
    this.mainForm = this.formBuilder.group({
      studentId: this.formBuilder.control(this.id, Validators.required),
      serviceType: this.serviceTypeCtrl,
      contentFile: this.contentFileCtrl,
      deadline: this.deadlineCtrl,
    });
  }

  private initFormControls(): void {
    this.serviceTypeCtrl = this.formBuilder.control('', Validators.required);
    this.contentFileCtrl = this.formBuilder.control(null, [Validators.required, requiredFileTypeValidator(this.extension)]);;
    this.deadlineCtrl = this.formBuilder.control('', Validators.required);
  }

  onFileChange(file: File){
    this.file = file;
  }

  onSubmitForm(){
    const formData = toFormData(this.mainForm.value);
    formData.append('file', this.file!, this.file!.name);
    this.requestTreatmentService.addRequestTreatment(formData).subscribe(
      (response) =>{
        this.loading = false;
        this.resetForm();
        if(this.currentUser.role === 'BASIC'){
          this.router.navigateByUrl(`/service/request-treatment`);
        }
        else{
          this.router.navigateByUrl(`/service/request-treatment/student/${this.id}`);
        }

        
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

  private resetForm(){
    this.mainForm.reset();
  }

  hasError( field: string, error: string ) {
    return this.contentFileCtrl.dirty && this.contentFileCtrl.hasError(error);
  }

  private initObservables() {
    // this.serviceTypes = this.route.data.pipe(
    //   map(data => data['serviceTypes'])
    // );

    // this.servicePricings = this.route.data.pipe(
    //   map(data => data['servicePricings'])
    // );

    const id$ = this.serviceTypeCtrl.valueChanges.pipe(
      startWith(this.serviceTypeCtrl.value),
      map(value => value)
    );

    const code$ = this.deadlineCtrl.valueChanges.pipe(
      startWith(this.deadlineCtrl.value),
      map(value => value)
    );

    this.servicePricings$ = of([
      {
        id:2,
        returnDeadline:"24 Heures",
        price:"10"
      },
      {
        id:1,
        returnDeadline:"",
        price:""
      }
    ]);
    this.showPricing$ = combineLatest([
      id$,
      code$,
      this.servicePricings$
    ]).pipe(
        map(([id, code, pricings]) => this.findPriceService(pricings, id, code)
    ));
  }

  

  private findPriceService(pricings:ServicePricing[], id:number, code:string) : boolean{
    console.log(id)
    const price = pricings.find(x=>{
        return x.id == id && x.returnDeadline === code;
    });
    this.pricing = price === undefined ? '' : price.price;
    return this.pricing.length > 0;

  }
}


export interface ServicePricing{
  id:number;
  returnDeadline: string;
  price: string;
}


