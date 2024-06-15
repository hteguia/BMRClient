import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardService } from "./dashboard.service";

@NgModule({
    declarations: [
    
  
    DashboardComponent
  ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
    ],
    providers: [
      DashboardService
    ]
})

export class DashboardModule { }