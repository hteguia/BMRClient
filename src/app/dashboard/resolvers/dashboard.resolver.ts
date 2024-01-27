import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { AuthService } from 'src/app/auth/services/auth.service';
import { DashboardService } from "../services/dashboard.service";




@Injectable()
export class DashboardResolver implements Resolve<any>{
    constructor(private dashboardService: DashboardService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.dashboardService.getUserProfil();
    }

}