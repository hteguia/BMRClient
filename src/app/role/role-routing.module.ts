import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './components/role/role.component';
import { RolesResolver } from './resolvers/role.resolver';
import { SingleRoleComponent } from './components/single-role/single-role.component';
import { AddRoleComponent } from './components/add-role/add-role.component';

const routes: Routes = [
  {path: '', component: RoleComponent, resolve:{roles: RolesResolver}},
  {path:'add', component:AddRoleComponent},
  {path:':id', component:SingleRoleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
