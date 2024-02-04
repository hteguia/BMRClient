import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('formTrigger', [
      state('void', style({
        transform: 'translateX(-100%)',
        opacity: 0,
        'background-color': 'rgb(255, 255, 255)',
      })),
      state('*', style({
        transform: 'translateX(0)',
        opacity: 1,
        'background-color': 'white'
      })),
      transition('void => *', animate('300ms ease-out'))
    ])
  ]
})
export class LoginComponent implements OnInit {

  private auth = inject(AuthService);
  private socialAuthService = inject(SocialAuthService);
  constructor(private router: Router, 
              private formBuilder: FormBuilder) 
  { }

  mainForm!: FormGroup;
  loading = false;
  showErrorMessage = false;

  ngOnInit(): void {
    this.initMainForm();
    console.log(this.mainForm.valid);
    this.mainForm.get('email')?.valueChanges.subscribe(
      (value) => {
        console.log(this.mainForm.valid);
      }
    );
  }

  private initMainForm(): void {
    this.mainForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email] ],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    this.loading = true;
    this.showErrorMessage = false;
    this.auth.login(this.mainForm.value).pipe(
      take(1),
      tap(currentUser => {
        this.loading = false;
        if(currentUser){
          this.auth.setUserData(currentUser.data);
          this.auth.setToken(currentUser.data.jwToken);
          this.router.navigateByUrl('/');
        }
        else{
          this.showErrorMessage = true;
        }
      })
    ).subscribe();
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
