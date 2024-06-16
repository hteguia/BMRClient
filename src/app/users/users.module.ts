import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StudentComponent } from './student/student.component';

import { AddPartnerComponent } from './partner-add/add-partner.component';

import { CollaboraterComponent } from './collaborater/collaborater.component';


import { StudentAddComponent } from './student-add/student-add.component';
import { UsersService } from './users.service';
import { CollaboraterAddComponent } from './collaborater-add/collaborater-add.component';
import { PartnerComponent } from './partner/partner.component';
import { CollaboraterResolver, PartnerResolver, RoleResolver } from './users.resolver';




@NgModule({
  declarations: [
    PartnerComponent,
    StudentComponent,
    CollaboraterComponent,
    AddPartnerComponent,
    StudentAddComponent,
    CollaboraterAddComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  providers:[
      UsersService,
      CollaboraterResolver,
      PartnerResolver,
      RoleResolver
  ]
})
export class UsersModule { }
