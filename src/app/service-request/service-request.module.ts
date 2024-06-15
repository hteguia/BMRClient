import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { ServiceRequestRoutingModule } from './service-request-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DocumentTypeResolver } from './resolvers/document-type.resolver';
import { CollaboraterService } from '../users/services/collaborater.service';
import { StudentService } from '../users/services/student.service';
import { DocumentModelComponent } from './document-model/document-model.component';
import { ServiceRequestService } from './service.request.service';
import { DocumentModelAddComponent } from './document-model-add/document-model-add.component';
import { StudentRequestComponent } from './student-request/student-request.component';
import { StudentListRequestComponent } from './student-list-request/student-list-request.component';
import { StudentRequestConsultComponent } from './student-request-consult/student-request-consult.component';
import { StudentRequestAddComponent } from './student-request-add/student-request-add.component';



@NgModule({
  declarations: [
    DocumentTypeComponent,
    DocumentModelComponent,
    DocumentModelAddComponent,
    StudentRequestComponent,
    StudentListRequestComponent,
    StudentRequestConsultComponent,
    StudentRequestAddComponent
  ],
  imports: [
    CommonModule,
    ServiceRequestRoutingModule,
    SharedModule
  ],
  providers:[
    DocumentTypeResolver, 
    CollaboraterService, 
    StudentService,
    ServiceRequestService]
})
export class ServiceRequestModule { }
