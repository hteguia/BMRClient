import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { AuthService } from 'src/app/auth/services/auth.service';
import { Billing } from "../models/billing.model";
import { SmsService } from "../services/sms.service";


@Injectable()
export class UserBillingsResolver implements Resolve<Billing[]>{
    constructor(private authService: AuthService, private smsService: SmsService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Billing[]> {
        console.log(this.authService.currentUser.id);
        return this.smsService.getUserBillings(this.authService.currentUser.id);
    }

}