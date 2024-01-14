import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerComponent } from './pages/partners/partner/partner.component';
import { PartnerResolver } from './resolvers/partner.resolver';
import { StudentComponent } from './pages/students/student/student.component';
import { StudentResolver } from './resolvers/student.resolver';
import { CollaboraterComponent } from './pages/collaboraters/collaborater/collaborater.component';
import { CollaboraterResolver } from './resolvers/collaborater.resolver';
import { AddCollaboraterComponent } from './pages/collaboraters/add-collaborater/add-collaborater.component';
import { RoleResolver } from './resolvers/role.resolver';



const routes: Routes = [
    { path: "partner", component: PartnerComponent, resolve: { data: PartnerResolver } },
    { path: "student", component: StudentComponent, resolve: { data: StudentResolver } },
    { path: "collaborater", component: CollaboraterComponent, resolve: { data: CollaboraterResolver } },
    { path: "collaborater/add", component:AddCollaboraterComponent, resolve:{data: RoleResolver } }
];
  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
  

export class UsersRoutingModule {

}