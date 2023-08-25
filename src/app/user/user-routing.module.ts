import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleComponent } from './components/role/role.component';
import { RolesResolver } from './resolvers/roles.resolver';
import { SingleRoleComponent } from './components/single-role/single-role.component';
import { UsersResolver } from './resolvers/users.resolver';
import { HabilitationsResolver } from './resolvers/habilitation.resolver';

const routes: Routes = [
  { path:'roles', component: RoleComponent, resolve: { roles: RolesResolver } },
  { path: 'roles/:id', component: SingleRoleComponent, resolve: { users: UsersResolver, habilitations: HabilitationsResolver } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
