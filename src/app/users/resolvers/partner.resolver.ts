import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { AuthService } from 'src/app/auth/services/auth.service';
import { PartnerModel } from "../models/partner.model";
import { PartnerService } from "../services/partner.service";



@Injectable()
export class PartnerResolver implements Resolve<PartnerModel[]>{
    constructor(private authService: AuthService, private partnerService: PartnerService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PartnerModel[]> {
        return this.partnerService.getAllPartner();
    }

}