import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { RolesService } from "../services/role.service";
import { Role } from "../models/role.model";
import { Observable } from "rxjs";

@Injectable()
export class RolesResolver implements Resolve<Role[]>{
    constructor(private rolesService: RolesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Role[]> {
        return this.rolesService.getRoles();
    }

}