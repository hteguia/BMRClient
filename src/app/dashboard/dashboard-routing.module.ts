import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { UserResolver } from "../users/resolvers/user.resolver";
import { DashboardResolver } from "./resolvers/dashboard.resolver";

const routes: Routes = [
    { path: '', component:DashboardComponent,  resolve: { data: DashboardResolver } }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  

export class DashboardRoutingModule { }