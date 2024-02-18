import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentTypeComponent } from './pages/document-type/document-type.component';
import { DocumentTemplateComponent } from './pages/document-template/document-template.component';
import { ServiceRequestRoutingModule } from './service-request-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DocumentTypeService } from './services/document-type.service';
import { DocumentTypeResolver } from './resolvers/document-type.resolver';
import { DocumentTemplateService } from './services/document-template.service';
import { DocumentTemplateResolver } from './resolvers/document-template.resolver';
import { RequestTreatmentComponent } from './pages/request-treatment/request-treatment.component';
import { AddRequestTreatmentComponent } from './pages/add-request-treatment/add-request-treatment.component';
import { RequestTreatmentService } from './services/request-treatment.service';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentListResolver } from './resolvers/student-list.resolver';
import { ConsultRequestTreatmentComponent } from './pages/consult-request-treatment/consult-request-treatment.component';
import { CollaboraterService } from '../users/services/collaborater.service';
import { RequestTreatmentStatusComponent } from './components/request-treatment-status/request-treatment-status.component';
import { RequestTreatmentDetailComponent } from './components/request-treatment-detail/request-treatment-detail.component';
import { RequestTreatmentResultComponent } from './components/request-treatment-result/request-treatment-result.component';
import { RequestTreatementResolver } from './resolvers/request.treatment.resolver';
import { StudentService } from '../users/services/student.service';
import { RequestTreatementListResolver } from './resolvers/request.treatment.list.resolver';



@NgModule({
  declarations: [
    DocumentTypeComponent,
    DocumentTemplateComponent,
    RequestTreatmentComponent,
    AddRequestTreatmentComponent,
    StudentListComponent,
    ConsultRequestTreatmentComponent,
    RequestTreatmentStatusComponent,
    RequestTreatmentDetailComponent,
    RequestTreatmentResultComponent
  ],
  imports: [
    CommonModule,
    ServiceRequestRoutingModule,
    SharedModule
  ],
  providers:[
    DocumentTypeService, 
    DocumentTypeResolver, 
    DocumentTemplateService, 
    DocumentTemplateResolver, 
    RequestTreatmentService,
    CollaboraterService, 
    StudentListResolver,
    StudentService,
    RequestTreatementListResolver,
    RequestTreatementResolver]
})
export class ServiceRequestModule { }
