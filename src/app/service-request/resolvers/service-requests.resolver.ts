import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { ServiceRequest } from "../models/service-request.model";
import { ServiceRequestsService } from "../services/service-requests.service";


@Injectable()
export class ServiceRequestsResolver implements Resolve<ServiceRequest[]>{
    constructor(private serviceRequestsService: ServiceRequestsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ServiceRequest[]> {
        return this.serviceRequestsService.getServiceRequests();
    }

}