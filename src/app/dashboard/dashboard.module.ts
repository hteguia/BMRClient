import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
    declarations: [
    
  
    DashboardComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule
    ],
    providers: [
        
    ]
})

export class DashboardModule { }