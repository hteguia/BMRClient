import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


import { SharedModule } from "../shared/shared.module";
import { ComplexFormComponent } from "./components/complex-form/complex-form.component";
import { ComplexFormRoutingModule } from "./complex-form-routing.module";
import { ComplexFormService } from "./services/complex-form.service";

@NgModule({
    declarations: [
        ComplexFormComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        ComplexFormRoutingModule
    ],
    providers: [
        ComplexFormService
    ]
})

export class ComplexFormModule { }