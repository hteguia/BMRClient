import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceRequestListComponent } from './components/service-request-list/service-request-list.component';
import { ServiceRequestsResolver } from './resolvers/service-requests.resolver';
import { ServiceRequestFormComponent } from './components/service-request-form/service-request-form.component';
import { ServiceTypesResolver } from './resolvers/service-types.resolver';
import { ServicePricingsResolver } from './resolvers/service-pricings.resolver';
import { ServiceRequestDetailComponent } from './components/service-request-detail/service-request-detail.component';

const routes: Routes = [
  { path: 'add-service-request', component: ServiceRequestFormComponent, resolve: {serviceTypes: ServiceTypesResolver, servicePricings: ServicePricingsResolver } },
  { path: 'consult/:id', component: ServiceRequestDetailComponent },
  { path: '', component:ServiceRequestListComponent, resolve: { serviceResquests: ServiceRequestsResolver } },
];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  

export class ServiceRequestRoutingModule {

}