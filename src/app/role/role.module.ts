import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './components/role/role.component';
import { RolesService } from './services/role.service';
import { RolesResolver } from './resolvers/role.resolver';
import { SharedModule } from '../shared/shared.module';
import { SingleRoleComponent } from './components/single-role/single-role.component';
import { AddRoleComponent } from './components/add-role/add-role.component';


@NgModule({
  declarations: [
    RoleComponent,
    SingleRoleComponent,
    AddRoleComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    SharedModule
  ],
  providers:[RolesService, RolesResolver,]
})
export class RoleModule { }
