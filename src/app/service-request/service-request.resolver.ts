import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { AuthService } from 'src/app/auth/services/auth.service';
import { ServiceRequestService } from "./service.request.service";
import { DocumentTypeModel } from "./service-request.model";




@Injectable()
export class DocumentTypeResolver implements Resolve<DocumentTypeModel[]>{
    constructor(private authService: AuthService, private serviceRequestService: ServiceRequestService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DocumentTypeModel[]> {
        return this.serviceRequestService.getAllDocumentType();
    }

}