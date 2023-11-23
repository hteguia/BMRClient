import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { AuthGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './page.not.found.component';
import { LayoutComponent } from './core/components/layout/layout.component';

const routes: Routes = [
  {path: 'auth', loadChildren: ()=> import('./auth/auth.module').then(m=>m.AuthModule) },
  {
      path: '', component:LayoutComponent, canActivate:[AuthGuard],
      children:[
      { path: 'dashboard', loadChildren: ()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule) },
      { path: 'sms', loadChildren:()=>import('./sms/sms.module').then(m=>m.SmsModule) },
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
