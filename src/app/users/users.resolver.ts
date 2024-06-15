import { Injectable } from "@angular/core";
import { CollaboraterModel, PartnerModel } from "./users.model";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../auth/services/auth.service";
import { CollaboraterService } from "./services/collaborater.service";
import { Observable } from "rxjs";
import { PartnerService } from "./services/partner.service";

@Injectable()
export class CollaboraterResolver implements Resolve<CollaboraterModel[]>{
    constructor(private authService: AuthService, private collaboraterService: CollaboraterService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CollaboraterModel[]> {
        return this.collaboraterService.getAllCollaborater();
    }
}

@Injectable()
export class PartnerResolver implements Resolve<PartnerModel[]>{
    constructor(private authService: AuthService, private partnerService: PartnerService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PartnerModel[]> {
        return this.partnerService.getAllPartner();
    }

}

@Injectable()
export class RoleResolver implements Resolve<PartnerModel[]>{
    constructor(private authService: AuthService, private partnerService: PartnerService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PartnerModel[]> {
        return this.partnerService.getAllPartner();
    }

}