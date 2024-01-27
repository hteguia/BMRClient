import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { AuthService } from 'src/app/auth/services/auth.service';
import { PartnerModel } from "../models/partner.model";
import { PartnerService } from "../services/partner.service";
import { UserService } from "../services/user.service";



@Injectable({providedIn: 'root'})
export class UserResolver implements Resolve<any>{
    constructor(private authService: AuthService, private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.userService.getUserProfil();
    }

}