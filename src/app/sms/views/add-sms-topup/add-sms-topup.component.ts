import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith, tap } from 'rxjs';
import { SmsService } from '../../services/sms.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Billing } from '../../models/billing.model';

@Component({
  selector: 'app-add-sms-topup',
  templateUrl: './add-sms-topup.component.html',
  styleUrls: ['./add-sms-topup.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate(1000, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AddSmsTopupComponent implements OnInit {

  loading = false; 
  
  mainForm!: FormGroup;
  billingGroup!: FormGroup;
  meanPaymentCtrl!: FormControl;
  numberCtrl!: FormControl;
  amountCtrl!: FormControl;

  momoCheck$!: Observable<boolean>;
  billings$!: Observable<Billing[]>;

  constructor(private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private router: Router,
    private smsService: SmsService,
    private authservice: AuthService){
  }
    
  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.initFormObservables();
    this.billings$ = this.route.data.pipe(
      tap(data=>this.setBillingValidator(data['billings'].length === 0)),
      map(data => data['billings']),
    ); 
    
  }

  private resetForm(){
    this.mainForm.reset();
  }
  
  onSubmitForm(){
    console.log(this.mainForm.value);
    this.loading = true;
    this.smsService.saveTopup(this.mainForm.value).pipe(
      tap(saved => {
        this.loading = false;
        if(saved){
           this.resetForm();
        }
        else{
          console.error('Echec de l\'enregistrement');
        }
      })
    ).subscribe();
  }

  private initMainForm(){
    this.mainForm = this.formBuilder.group({
      amount: this.amountCtrl,
      number: this.numberCtrl,
      billing: this.billingGroup,
      billingId: this.formBuilder.control(''),
    });
  }

  private initFormControls(): void {
    this.meanPaymentCtrl = this.formBuilder.control(null, [Validators.required]);
    this.numberCtrl = this.formBuilder.control(null);
    this.amountCtrl = this.formBuilder.control('', [Validators.required, Validators.pattern("^[0-9]*$")]);

    this.billingGroup = this.formBuilder.group({
      lastName: this.formBuilder.control('', Validators.required),
      firstName: this.formBuilder.control('', Validators.required),
      compagny: this.formBuilder.control('', Validators.required),
      address: this.formBuilder.control('', Validators.required),
      city: this.formBuilder.control('', Validators.required),
      country: this.formBuilder.control('', Validators.required),
   });
  }

  private initFormObservables() {
    this.momoCheck$ = this.meanPaymentCtrl.valueChanges.pipe(
      startWith(this.meanPaymentCtrl.value), 
      map((val:string)=>val === "M"),
      tap(showEmailCtrl => this.setNumbervalidators(showEmailCtrl)),
    )
  }

  private setBillingValidator(validate: boolean){
    if(!validate){
      for (const key in this.billingGroup.controls) {
        this.billingGroup.get(key)!.clearValidators();
        this.billingGroup.get(key)!.updateValueAndValidity();  
      }
    }
  }

  private setNumbervalidators(showNumber: boolean){
    if (showNumber) {
      this.numberCtrl.addValidators([
          Validators.required
      ]);
    } 
    else {
      this.numberCtrl.clearValidators();
    }
    this.numberCtrl.updateValueAndValidity();
  }

  getFormControlErrorText(ctrl: AbstractControl){
    if(ctrl.hasError('required')) {
      return 'Ce champs est requis';
    }
    else if(ctrl.hasError('pattern')){
      return 'Merci d\'entrer un numéro/nombre valide';
    }
    else if (ctrl.hasError('minlength')) {
      return 'Ce numéro de téléphone ne contient pas assez de chiffres';
    } 
    else if (ctrl.hasError('maxlength')) {
        return 'Ce numéro de téléphone contient trop de chiffres';
    }
    else
    {
      return 'Ce champs contient une erreur';
    }
  }
}
