import { Component, HostListener, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, delay, map, take, tap } from 'rxjs';
import { animate, style, transition, trigger } from '@angular/animations';
import { confirmEqualValidator } from 'src/app/shared/validators/confirm-equal.validator';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('formTrigger', [
      transition('void => *',
      [
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
          'background-color': 'rgb(255, 255, 255)',
        }),
        animate('300ms ease-out', style({
          transform: 'translateX(0)',
          opacity: 1,
          'background-color': 'white'
        }))
      ])
    ]),
    trigger('descriptionTrigger', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate(1500, style({opacity: 1}))
      ]) 
    ])
  ]
})
export class RegisterComponent implements OnInit {

  auth = inject(AuthService);
  router = inject(Router); 
  
  mainForm!: FormGroup;
  credentialsForm!: FormGroup;
  personalInformationForm!: FormGroup;
  schoolInformationForm!: FormGroup;
  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;

  showPasswordError$!: Observable<boolean>;

  firstNameValue!: string;
  lastNameValue!: string;
  emailValue!: string;
  phoneNumberValue!: string;
  categoryValue!: string;
  schoolNameValue!: string;
  
  isLinear = false;

  isVertical = false;

  loading = false;

  
  status = ["Etudiant", "Généraliste", "Résident", "Spécialiste", "Autres"];
  school = ["ISTM (INSTITUT SUPERIEUR DES TECHNOLOGIES MEDICALE)",
            "FMSB (FACULTE DE MEDECINE ET DES SCIENCES BIOMEDICALE DE YAOUNDE)",
            "FMSP (FACULTE DE MEDECINE ET DES SCIENCES PHARMACEUTIQUES DE DOUALA)",
            "UB (UNIVERSITE DE BUEA)",
            "FHS (FACULTY OF HEALTH SCIENCES UNIVERSITY OF BUEA)",
            "UBa",
            "Autres",
          ];

  constructor(private formBuilder: FormBuilder) {

  }

  triggerState = 'default'

  @HostListener('window:resize') onWindowResize() {
    this.setWindowSize();
  }

  ngAfterViewInit(): void {
    this.updateFormValues();
  }

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.initFormObservables();
    this.setWindowSize();
    
  }

  private setWindowSize(){
    if (window.innerWidth <= 1000) {
      this.isVertical = true;
    } else {
      this.isVertical = false;
    }
  }

  private initMainForm(): void {
    this.mainForm = this.formBuilder.group({
      credentialsForm: this.credentialsForm,
      personalInformationForm: this.personalInformationForm,
      schoolInformationForm: this.schoolInformationForm,
    });
  }

  private initFormControls(): void {
    this.passwordCtrl = this.formBuilder.control('', Validators.required);
    this.confirmPasswordCtrl = this.formBuilder.control('', Validators.required);

    this.credentialsForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl,
    }, {
      Validators: [confirmEqualValidator('password', 'confirmPassword')],
      updateOn: 'blur'
    });

    this.personalInformationForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      phoneNumber: [''],
    });

    this.schoolInformationForm = this.formBuilder.group({
      category: [''],
      schoolName: [''],
    });
  }

  private initFormObservables(): void {
    this.showPasswordError$ = this.credentialsForm.statusChanges.pipe(
      map(status => status === 'INVALID' && this.passwordCtrl.value && this.confirmPasswordCtrl.value)
    )
  }

  private updateFormValues(): void {
    this.personalInformationForm.get('firstName')!.valueChanges.subscribe(data => this.firstNameValue = data);
    this.personalInformationForm.get('lastName')!.valueChanges.subscribe(data => this.lastNameValue = data);
    this.personalInformationForm.get('phoneNumber')!.valueChanges.subscribe(data => this.phoneNumberValue = data);
    this.credentialsForm.get('email')!.valueChanges.subscribe(data => this.emailValue = data);
    this.schoolInformationForm.get('category')!.valueChanges.subscribe(data => this.categoryValue = data);
    this.schoolInformationForm.get('schoolName')!.valueChanges.subscribe(data => this.schoolNameValue = data);
  }

  onRegister() {
    this.loading = true;
    console.log(this.mainForm.get('personalInformationForm.firstName')?.value);
    this.auth.register({firstName:"Hervé", lastName:"TEGUIA", userName:this.mainForm.get('credentialsForm.email')?.value, password:this.mainForm.get('credentialsForm.password')?.value, email:this.mainForm.get('credentialsForm.email')?.value}).pipe(
      delay(2000),
      take(1),
      tap(currentUser => {
        this.loading = false;
        if(currentUser){
          this.auth.saveAccessToken(currentUser);
          this.router.navigateByUrl('/');
        }
        else{
          //this.showErrorMessage = true;
        }
      })
    ).subscribe();
  }

  
}
