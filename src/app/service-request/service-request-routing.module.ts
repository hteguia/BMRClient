import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentTypeComponent } from './pages/document-type/document-type.component';
import { DocumentTypeResolver } from './resolvers/document-type.resolver';
import { DocumentTemplateResolver } from './resolvers/document-template.resolver';
import { RequestTreatmentComponent } from './pages/request-treatment/request-treatment.component';
import { AddRequestTreatmentComponent } from './pages/add-request-treatment/add-request-treatment.component';
import { ConsultRequestTreatmentComponent } from './pages/consult-request-treatment/consult-request-treatment.component';
import { RequestTreatementListResolver } from './resolvers/request.treatment.list.resolver';
import { DocumentModelComponent } from './document-model/document-model.component';
import { DocumentModelAddComponent } from './document-model-add/document-model-add.component';
import { StudentListRequestComponent } from './student-list-request/student-list-request.component';
import { StudentRequestComponent } from './student-request/student-request.component';

const routes: Routes = [
    { path: "request-treatment/student", component: StudentListRequestComponent },
    { path: "request-treatment/student/:id", component: StudentRequestComponent },
    { path: "request-treatment", component: RequestTreatmentComponent, resolve: { data: RequestTreatementListResolver } },
    { path: "request-treatment/student/:id/add", component: AddRequestTreatmentComponent, resolve: { data: DocumentTypeResolver } },
    { path: "request-treatment/:id/consult", component: ConsultRequestTreatmentComponent },
    { path: "document-type", component: DocumentTypeComponent, resolve: { listDocumentType: DocumentTypeResolver } },
    { path: "document-template", component: DocumentModelComponent, resolve: { listDocumentTemplate: DocumentTemplateResolver }  },
    { path: "document-template/add", component: DocumentModelAddComponent },
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
  
export class ServiceRequestRoutingModule {

}