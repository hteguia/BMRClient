import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { CollaboraterComponent } from './collaborater/collaborater.component';
import { StudentAddComponent } from './student-add/student-add.component';
import { CollaboraterAddComponent } from './collaborater-add/collaborater-add.component';
import { PartnerComponent } from './partner/partner.component';
import { PartnerResolver, RoleResolver } from './users.resolver';



const routes: Routes = [
    { path: "partner", component: PartnerComponent },
    { path: "student", component: StudentComponent },
    { path: "student/add", component:StudentAddComponent, resolve: { data: PartnerResolver } },
    { path: "collaborater", component: CollaboraterComponent },
    { path: "collaborater/add", component:CollaboraterAddComponent, resolve:{data: RoleResolver } },
    { path: "collaborater/:id/update", component:CollaboraterAddComponent, resolve:{data: RoleResolver } }
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
  

export class UsersRoutingModule {

}