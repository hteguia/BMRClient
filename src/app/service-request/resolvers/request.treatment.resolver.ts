import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { AuthService } from 'src/app/auth/services/auth.service';
import { DocumentTypeService } from "../services/document-type.service";
import { DocumentTypeModel } from "../models/document-type.model";
import { RequestTreatmentService } from "../services/request-treatment.service";



@Injectable()
export class RequestTreatementResolver implements Resolve<any>{
    constructor(private authService: AuthService, private requestTreatmentService: RequestTreatmentService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let myParam = route.data['resolvedata']; 
        console.log('myParam', myParam);
        return this.requestTreatmentService.getRequestTreatmentById(1);
    }

}