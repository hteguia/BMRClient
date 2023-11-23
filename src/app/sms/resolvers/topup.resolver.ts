import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { AuthService } from 'src/app/auth/services/auth.service';
import { Billing } from "../models/billing.model";
import { SmsService } from "../services/sms.service";
import { Topup } from "../models/topup.model";


@Injectable()
export class TopupResolver implements Resolve<Topup[]>{
    constructor(private authService: AuthService, private smsService: SmsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Topup[]> {
        console.log(this.authService.currentUser.id);
        return this.smsService.getTopup(this.authService.currentUser.id);
    }

}