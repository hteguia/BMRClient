import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentTypeComponent } from './document-type/document-type.component';
import { DocumentModelComponent } from './document-model/document-model.component';
import { DocumentModelAddComponent } from './document-model-add/document-model-add.component';
import { StudentListRequestComponent } from './student-list-request/student-list-request.component';
import { StudentRequestComponent } from './student-request/student-request.component';
import { StudentRequestConsultComponent } from './student-request-consult/student-request-consult.component';
import { StudentRequestAddComponent } from './student-request-add/student-request-add.component';
import { DocumentTypeResolver } from './service-request.resolver';
import { RequestTreatmentListComponent } from './request-treatment-list/request-treatment-list.component';

const routes: Routes = [
    { path: "student", component: StudentListRequestComponent },
    { path: "student/:id/request-treatment", component: StudentRequestComponent },
    { path: "student/:id/request-treatment/:id/consult", component: StudentRequestConsultComponent },
    { path: "student/:id/request-treatment/add", component: StudentRequestAddComponent, resolve: { data: DocumentTypeResolver } },
    { path: "document-type", component: DocumentTypeComponent },
    { path: "document-template", component: DocumentModelComponent },
    { path: "document-template/add", component: DocumentModelAddComponent },
    { path: "request-treatment", component: RequestTreatmentListComponent },
    { path: "request-treatment/:id/consult", component: StudentRequestConsultComponent },
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
  
export class ServiceRequestRoutingModule {

}