import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { SharedModule } from '../shared/shared.module';
import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RegisterConfirmComponent } from './components/register-confirm/register-confirm.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    RegisterConfirmComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    GoogleSigninButtonModule,
  ],
  providers:[
    AuthService
  ],
  exports:[
    LoginComponent
  ]
})
export class AuthModule { }
