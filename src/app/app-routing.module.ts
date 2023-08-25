import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { ShellComponent } from './core/components/shell/shell.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthService } from './auth/services/auth.service';
import { LayoutComponent } from './layout.component';
import { AuthChildGuard } from './core/guards/auth.child.guard';
import { PageNotFoundComponent } from './page.not.found.component';

const routes: Routes = [
  {path: 'auth', loadChildren: ()=> import('./auth/auth.module').then(m=>m.AuthModule) },
  {
      path: '', component:LayoutComponent, canActivate:[AuthGuard],
      children:[
      {path: 'users', loadChildren: ()=>import('./user/user.module').then(m=>m.UserModule)},
      {path: 'complex-form', loadChildren: ()=>import('./complex-form/complex-form.module').then(m=>m.ComplexFormModule)},
      {path: 'dashboard', loadChildren: ()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)},
      {path: 'social-media', loadChildren: ()=>import('./social-media/social-media.module').then(m=>m.SocialMediaModule)},
      {path: 'service-request', loadChildren: ()=>import('./service-request/service-request.module').then(m=>m.ServiceRequestModule)},
      {path: 'service-request-processing', loadChildren: ()=>import('./service-request-processing/service-request-processing.module').then(m=>m.ServiceRequestProcessingModule)},
      {path: 'reactive-state', loadChildren: ()=>import('./reactive-state/reactive-state.module').then(m=>m.ReactiveStateModule)},
      {
        path: '**',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthRoutingModule],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
