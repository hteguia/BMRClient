import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { RolesService } from "../services/roles.service";
import { Role } from "../models/role.model";


@Injectable()
export class RolesResolver implements Resolve<Role[]>{
    constructor(private rolesService: RolesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Role[]> {
        return this.rolesService.getRoles();
    }

}