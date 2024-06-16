import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { ServiceRequestRoutingModule } from './service-request-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DocumentModelComponent } from './document-model/document-model.component';
import { ServiceRequestService } from './service.request.service';
import { DocumentModelAddComponent } from './document-model-add/document-model-add.component';
import { StudentRequestComponent } from './student-request/student-request.component';
import { StudentListRequestComponent } from './student-list-request/student-list-request.component';
import { StudentRequestConsultComponent } from './student-request-consult/student-request-consult.component';
import { StudentRequestAddComponent } from './student-request-add/student-request-add.component';
import { DocumentTypeResolver } from './service-request.resolver';
import { RequestTreatmentListComponent } from './request-treatment-list/request-treatment-list.component';



@NgModule({
  declarations: [
    DocumentTypeComponent,
    DocumentModelComponent,
    DocumentModelAddComponent,
    StudentRequestComponent,
    StudentListRequestComponent,
    StudentRequestConsultComponent,
    StudentRequestAddComponent,
    RequestTreatmentListComponent
  ],
  imports: [
    CommonModule,
    ServiceRequestRoutingModule,
    SharedModule
  ],
  providers:[
    DocumentTypeResolver, 
    ServiceRequestService]
})
export class ServiceRequestModule { }
