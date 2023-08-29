import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { confirmEqualValidator } from 'src/app/complex-form/validators/confirm-equal.validator';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('formTrigger', [
      state('default', style({
        transform: 'scale(1)',
        'background-color': 'white',
        'z-index': 1
      })),
      state('active', style({
        transform: 'scale(1.05)',
        'background-color': 'rgb(255, 255, 255)',
        'z-index': 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out')
      ]),
      transition('active => default', [
        animate('500ms ease-in-out')
      ]),
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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });

    this.schoolInformationForm = this.formBuilder.group({
      category: ['', Validators.required],
      schoolName: ['', Validators.required],
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
  
}
