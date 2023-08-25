import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "../shared/shared.module";
import { ServiceRequestProcessingListComponent } from "./components/service-request-processing-list/service-request-processing-list.component";
import { ServiceRequestProcessingDetailComponent } from "./components/service-request-processing-detail/service-request-processing-detail.component";
import { ServiceRequestProcessingFormComponent } from "./components/service-request-processing-form/service-request-processing-form.component";

@NgModule({
    declarations: [
        ServiceRequestProcessingListComponent,
        ServiceRequestProcessingDetailComponent,
        ServiceRequestProcessingFormComponent
  ],
    imports: [
        CommonModule,
        SharedModule
    ],
    providers: [
    ]
})

export class ServiceRequestProcessingModule { }