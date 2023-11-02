import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RegisterConfirmComponent } from './components/register-confirm/register-confirm.component';

const routes: Routes = [
  { path: "auth/login", component: LoginComponent },
  { path: "auth/register", component: RegisterComponent },
  { path: "auth/forgot-password", component: ForgotPasswordComponent }, 
  { path: "auth/register-confirm", component: RegisterConfirmComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
