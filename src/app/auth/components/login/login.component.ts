import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
    ])
  ]
})
export class LoginComponent implements OnInit {

 

  constructor(private auth: AuthService,
    private router: Router, private socialAuthService: SocialAuthService) { }
  triggerState = 'default'
  ngOnInit(): void {
  }

  onLogin() {
    this.auth.login()
    this.router.navigateByUrl('/');
    
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
