import { Component, OnInit } from '@angular/core';
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
    ])
  ]
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router, 
              private socialAuthService: SocialAuthService,
              private formBuilder: FormBuilder) { }

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
    this.auth.login(this.mainForm.value).pipe(
      delay(2000),
      take(1),
      tap(logggedIn => {
        this.loading = false;
        if(logggedIn){
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
