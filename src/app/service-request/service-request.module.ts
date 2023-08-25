import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";


import { SharedModule } from "../shared/shared.module";
import { ServiceRequestListComponent } from './components/service-request-list/service-request-list.component';
import { ServiceRequestDetailComponent } from './components/service-request-detail/service-request-detail.component';
import { ServiceRequestFormComponent } from './components/service-request-form/service-request-form.component';
import { ServiceRequestRoutingModule } from "./service-request-routing.module";
import { ServiceRequestsResolver } from "./resolvers/service-requests.resolver";
import { ServiceRequestsService } from "./services/service-requests.service";
import { ServiceTypesService } from "./services/service-types.service";
import { ServiceTypesResolver } from "./resolvers/service-types.resolver";
import { ServicePricingsService } from "./services/service-pricings.service";
import { ServicePricingsResolver } from "./resolvers/service-pricings.resolver";

@NgModule({
    declarations: [
  
    ServiceRequestListComponent,
       ServiceRequestDetailComponent,
       ServiceRequestFormComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        ServiceRequestRoutingModule,
    ],
    providers: [
        ServiceRequestsService,
        ServiceRequestsResolver,
        ServiceTypesService,
        ServiceTypesResolver,
        DatePipe,
        ServicePricingsService,
        ServicePricingsResolver,
    ]
})

export class ServiceRequestModule { }