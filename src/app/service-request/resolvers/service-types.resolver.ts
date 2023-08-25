import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { ServiceType } from "../models/service-type.model";
import { ServiceTypesService } from "../services/service-types.service";


@Injectable()
export class ServiceTypesResolver implements Resolve<ServiceType[]>{
    constructor(private serviceTypesService: ServiceTypesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ServiceType[]> {
        return this.serviceTypesService.getServiceTypes();
    }

}