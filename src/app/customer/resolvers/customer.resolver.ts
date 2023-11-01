import { Inject, Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { CustomerService } from "../services/customer.service";
import { Customer } from "../models/customer.model";


@Injectable()
export class CustomerResolver implements Resolve<Customer[]>{
 
    
    constructor(private customerService: CustomerService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Customer[]> {
        return this.customerService.getCustomers();
    }

}