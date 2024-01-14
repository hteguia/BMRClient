import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerComponent } from './pages/partners/partner/partner.component';
import { PartnerService } from './services/partner.service';
import { PartnerResolver } from './resolvers/partner.resolver';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StudentComponent } from './pages/students/student/student.component';
import { StudentService } from './services/student.service';
import { StudentResolver } from './resolvers/student.resolver';
import { CollaboraterService } from './services/collaborater.service';
import { CollaboraterResolver } from './resolvers/collaborater.resolver';
import { AddCollaboraterComponent } from './pages/collaboraters/add-collaborater/add-collaborater.component';
import { AddPartnerComponent } from './pages/partners/add-partner/add-partner.component';
import { RoleService } from './services/role.service';
import { RoleResolver } from './resolvers/role.resolver';
import { CollaboraterComponent } from './pages/collaboraters/collaborater/collaborater.component';
import { UpdateCollaboraterComponent } from './pages/collaboraters/update-collaborater/update-collaborater.component';



@NgModule({
  declarations: [
    PartnerComponent,
    StudentComponent,
    CollaboraterComponent,
    AddCollaboraterComponent,
    AddPartnerComponent,
    UpdateCollaboraterComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ],
  providers:[
      PartnerService, 
      PartnerResolver, 
      StudentService, 
      StudentResolver,
      CollaboraterService,
      CollaboraterResolver,
      RoleService,
      RoleResolver
  ]
})
export class UsersModule { }
