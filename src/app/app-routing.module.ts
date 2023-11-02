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
      {path: 'users', loadChildren: ()=>import('./user/user.module').then(m=>m.UserModule)},
      {path: 'dashboard', loadChildren: ()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule)},
      {path: 'service-request', loadChildren: ()=>import('./service-request/service-request.module').then(m=>m.ServiceRequestModule)},
      {path: 'service-request-processing', loadChildren: ()=>import('./service-request-processing/service-request-processing.module').then(m=>m.ServiceRequestProcessingModule)},
      {path: 'permissions', loadChildren: ()=>import('./permission/permission.module').then(m=>m.PermissionModule)},
      {path: 'roles', loadChildren: ()=>import('./role/role.module').then(m=>m.RoleModule)},
      {path: 'customers', loadChildren: ()=>import('./customer/customer.module').then(m=>m.CustomerModule)},
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
  imports: [RouterModule.forRoot(routes, {useHash: true}), AuthRoutingModule],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
