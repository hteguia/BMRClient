import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { AuthService } from 'src/app/auth/services/auth.service';
import { PartnerModel } from "../models/partner.model";
import { PartnerService } from "../services/partner.service";
import { RoleService } from "../services/role.service";
import { RoleModel } from "../models/role.model";



@Injectable()
export class RoleResolver implements Resolve<RoleModel[]>{
    constructor(private authService: AuthService, private roleService: RoleService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<RoleModel[]> {
        return this.roleService.GetRoleForCreateUser();
    }

}