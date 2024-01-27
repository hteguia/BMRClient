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



@NgModule({
  declarations: [
    DocumentTypeComponent,
    DocumentTemplateComponent,
    RequestTreatmentComponent,
    AddRequestTreatmentComponent,
    StudentListComponent
  ],
  imports: [
    CommonModule,
    ServiceRequestRoutingModule,
    SharedModule
  ],
  providers:[DocumentTypeService, DocumentTypeResolver, DocumentTemplateService, DocumentTemplateResolver, RequestTreatmentService, StudentListResolver]
})
export class ServiceRequestModule { }
