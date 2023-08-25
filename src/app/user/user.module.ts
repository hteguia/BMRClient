import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { RoleComponent } from './components/role/role.component';
import { RolesService } from './services/roles.service';
import { RolesResolver } from './resolvers/roles.resolver';
import { SharedModule } from '../shared/shared.module';
import { SingleRoleComponent } from './components/single-role/single-role.component';
import { UsersService } from './services/users.service';
import { UsersResolver } from './resolvers/users.resolver';
import { HabilitationsResolver } from './resolvers/habilitation.resolver';


@NgModule({
  declarations: [
    RoleComponent,
    SingleRoleComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ],
  providers:[
    RolesResolver,
    RolesService,
    UsersService,
    UsersResolver,
    HabilitationsResolver,
  ]
})
export class UserModule { }
