import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentTemplateComponent } from './pages/document-template/document-template.component';
import { DocumentTypeComponent } from './pages/document-type/document-type.component';
import { DocumentTypeResolver } from './resolvers/document-type.resolver';
import { DocumentTemplateResolver } from './resolvers/document-template.resolver';


const routes: Routes = [
    { path: "document-type", component: DocumentTypeComponent, resolve: { listDocumentType: DocumentTypeResolver } },
    { path: "document-template", component: DocumentTemplateComponent, resolve: { listDocumentTemplate: DocumentTemplateResolver }  },
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
  

export class ServiceRequestRoutingModule {

}