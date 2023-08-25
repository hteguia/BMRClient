import { Component, OnInit } from '@angular/core';
import { ServiceTypesService } from '../../services/service-types.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceType } from '../../models/service-type.model';
import { Observable, combineLatest, map, startWith, tap } from 'rxjs';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceRequestsService } from '../../services/service-requests.service';
import { requiredFileTypeValidator } from 'src/app/shared/validators/required-file-type.validator';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ServicePricing } from '../../models/service-pricing.model';

@Component({
  selector: 'app-service-request-form',
  templateUrl: './service-request-form.component.html',
  styleUrls: ['./service-request-form.component.css'],
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
export class ServiceRequestFormComponent implements OnInit {

  loading = false; 
  extension = ['png', 'pdf']

  pricing = "";

  mainForm!: FormGroup;
  serviceInfoForm!: FormGroup;
  serviceTypeCtrl!: FormControl;
  returnDeadlineCtrl!: FormControl;
  contentFileCtrl!: FormControl;

  listItemAnimateState = 'default';
  
  serviceTypes!: Observable<ServiceType[]>;
  servicePricings!: Observable<ServicePricing[]>;
  showPricing$!: Observable<boolean>;
  returnDeadlines = [{name:"24 Heure(s)", code:"24"}, {name:"48 Heure(s)", code:"48"}, {name:"72 Heure(s)", code:"72"}, {name:"5 Jour(s)",code:"120"}, {name:"1 Semaine(s)", code:"150"}, {name:"2 Semaine(s)", code:"160"}, {name:"1 Mois", code:"170"}, {name:"+1 Mois", code:"180"}]
  
  fileName = '';

  constructor(private route: ActivatedRoute, 
              private serviceTypesService: ServiceTypesService,
              private serviceRequestService: ServiceRequestsService,
              private formBuilder: FormBuilder,
              private router: Router){
    
  }

  ngOnInit(): void {  
    this.initFormControls();
    this.initMainForm();
    this.initObservables();
  }

  private findPriceService(pricings:ServicePricing[], id:number, code:string) : boolean{
    const price = pricings.find(x=>{
        return x.id == id && x.returnDeadline === code;
    });
    this.pricing = price === undefined ? '' : price.price;
    return this.pricing.length > 0;
  }

  private initFormControls(): void {
    this.serviceTypeCtrl = this.formBuilder.control('', Validators.required);
    this.returnDeadlineCtrl = this.formBuilder.control('', Validators.required);
    this.contentFileCtrl = this.formBuilder.control(null, [Validators.required, requiredFileTypeValidator(this.extension)]);
    this.serviceInfoForm = this.formBuilder.group({
      email: this.serviceTypeCtrl,
      confirm: this.returnDeadlineCtrl,
      contentFile: this.contentFileCtrl,
    });
  }

  private initMainForm(): void{
    this.mainForm = this.formBuilder.group({
      serviceType: this.serviceTypeCtrl,
      returnDeadline: this.returnDeadlineCtrl,
      file: this.contentFileCtrl
    });
  }

  private resetForm(){
    this.mainForm.reset();
  }
  
  onSubmitForm(){
    this.loading = true;
    this.serviceRequestService.saveServiceRequest(this.mainForm.value);
    this.resetForm();
  }

  hasError( field: string, error: string ) {
    return this.contentFileCtrl.dirty && this.contentFileCtrl.hasError(error);
  }

  onClose(){
    this.router.navigateByUrl('/service-request');
  }

  private initObservables() {
    this.serviceTypes = this.route.data.pipe(
      map(data => data['serviceTypes'])
    );

    this.servicePricings = this.route.data.pipe(
      map(data => data['servicePricings'])
    );

    const id$ = this.serviceTypeCtrl.valueChanges.pipe(
      startWith(this.serviceTypeCtrl.value),
      map(value => value)
    );

    const code$ = this.returnDeadlineCtrl.valueChanges.pipe(
      startWith(this.returnDeadlineCtrl.value),
      map(value => value)
    );

    this.showPricing$ = combineLatest([
      id$,
      code$,
      this.servicePricings
    ]).pipe(
        map(([id, code, pricings]) => this.findPriceService(pricings, id, code)
    ));
  }

  
}
