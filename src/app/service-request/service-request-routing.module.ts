import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentTemplateComponent } from './pages/document-template/document-template.component';
import { DocumentTypeComponent } from './pages/document-type/document-type.component';
import { DocumentTypeResolver } from './resolvers/document-type.resolver';
import { DocumentTemplateResolver } from './resolvers/document-template.resolver';
import { RequestTreatmentComponent } from './pages/request-treatment/request-treatment.component';
import { AddRequestTreatmentComponent } from './pages/add-request-treatment/add-request-treatment.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentListResolver } from './resolvers/student-list.resolver';
import { ConsultRequestTreatmentComponent } from './pages/consult-request-treatment/consult-request-treatment.component';


const routes: Routes = [
    { path: "student", component: StudentListComponent, resolve: { data: StudentListResolver } },
    { path: "student/:id/request-treatment", component: RequestTreatmentComponent },
    { path: "student/:id/request-treatment/add", component: AddRequestTreatmentComponent, resolve: { data: DocumentTypeResolver } },
    { path: "request-treatment/:id/consult", component: ConsultRequestTreatmentComponent },
    { path: "document-type", component: DocumentTypeComponent, resolve: { listDocumentType: DocumentTypeResolver } },
    { path: "document-template", component: DocumentTemplateComponent, resolve: { listDocumentTemplate: DocumentTemplateResolver }  },
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
  

export class ServiceRequestRoutingModule {

}