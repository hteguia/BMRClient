import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { AuthGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './page.not.found.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';
import { PageForbiddenComponent } from './page.forbidden.component';

const routes: Routes = [
  {path: 'auth', loadChildren: ()=> import('./auth/auth.module').then(m=>m.AuthModule) },
  {
      path: '', component:LayoutComponent, canActivate:[AuthGuard],
      children:[
      { path: 'dashboard', component: DashboardComponent },
      { path: 'service-request', loadChildren:()=>import('./service-request/service-request.module').then(m=>m.ServiceRequestModule) },
      { path: 'user', loadChildren:()=>import('./users/users.module').then(m=>m.UsersModule) },
      {path: 'forbidden', component: PageForbiddenComponent },
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
  providers:[AuthGuard, provideRouter(routes, withComponentInputBinding(), withRouterConfig({ paramsInheritanceStrategy: 'always' }))]
})
export class AppRoutingModule { }
