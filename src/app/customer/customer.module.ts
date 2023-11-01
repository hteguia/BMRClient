import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './views/customer-list/customer-list.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CustomerService } from './services/customer.service';
import { CustomerResolver } from './resolvers/customer.resolver';
import { AddCustomerComponent } from './views/add-customer/add-customer.component';



@NgModule({
  declarations: [
    CustomerListComponent,
    AddCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    SharedModule
  ],
  providers:[CustomerService, CustomerResolver]
})
export class CustomerModule { }
