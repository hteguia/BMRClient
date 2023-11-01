import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './views/customer-list/customer-list.component';
import { CustomerResolver } from './resolvers/customer.resolver';
import { AddCustomerComponent } from './views/add-customer/add-customer.component';


const routes: Routes = [
    { path: '', component:CustomerListComponent, resolve: { customers: CustomerResolver } },
    {path: 'add', component:AddCustomerComponent}
];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  

export class CustomerRoutingModule {

}