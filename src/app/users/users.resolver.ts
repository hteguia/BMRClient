import { Injectable } from "@angular/core";
import { CollaboraterModel, PartnerModel, RoleModel } from "./users.model";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../auth/services/auth.service";
import { Observable } from "rxjs";
import { UsersService } from "./users.service";

@Injectable()
export class CollaboraterResolver implements Resolve<CollaboraterModel[]>{
    constructor(private authService: AuthService, private usersService: UsersService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CollaboraterModel[]> {
        return this.usersService.getAllCollaborater();
    }
}

@Injectable()
export class PartnerResolver implements Resolve<PartnerModel[]>{
    constructor(private authService: AuthService, private usersService: UsersService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PartnerModel[]> {
        return this.usersService.getAllPartner();
    }
    

}

@Injectable()
export class RoleResolver implements Resolve<RoleModel[]>{
    constructor(private authService: AuthService, private usersService: UsersService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RoleModel[]> {
        return this.usersService.getAllRole();
    }

}