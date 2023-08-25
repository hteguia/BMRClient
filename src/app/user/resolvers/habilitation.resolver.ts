import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { RolesService } from "../services/roles.service";
import { Role } from "../models/role.model";
import { Habilitation } from "../models/habilitation.model";


@Injectable()
export class HabilitationsResolver implements Resolve<Habilitation[]>{
    constructor(private rolesService: RolesService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Habilitation[]> {
        return this.rolesService.getHabilitations();
    }

}