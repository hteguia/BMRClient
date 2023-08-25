import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { ServiceType } from "../models/service-type.model";
import { ServiceTypesService } from "../services/service-types.service";
import { ServicePricing } from "../models/service-pricing.model";
import { ServicePricingsService } from "../services/service-pricings.service";


@Injectable()
export class ServicePricingsResolver implements Resolve<ServicePricing[]>{
    constructor(private servicePricingsService: ServicePricingsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ServicePricing[]> {
        return this.servicePricingsService.getServicePricings();
    }

}