import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardResolver } from "./resolvers/dashboard.resolver";
import { DashboardService } from "./services/dashboard.service";

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
      DashboardService,
      DashboardResolver
    ]
})

export class DashboardModule { }