import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, mapTo, of } from "rxjs";
import { environment } from "src/environments/environment";
import { SmsCostModel } from "../models/sms-cost.model";
import { Billing } from "../models/billing.model";
import { Topup } from "../models/topup.model";

@Injectable()
export class SmsService {

    constructor(private http: HttpClient) {}

    getUserBillings(userId: string): Observable<Billing[]> {
        return this.http.get<Billing[]>(`${environment.apiUrl}/v1/billing/user/${userId}`);
    }

    saveTopup(formValue: any): Observable<boolean> {
        return this.http.post(`${environment.apiUrl}/v1/smstopup`, formValue).pipe(
            mapTo(true),
            catchError(() => of(false).pipe(
              delay(1000)
            ))
        );
    }

    getTopup(userId: string): Observable<Topup[]> {
        return this.http.get<Topup[]>(`${environment.apiUrl}/v1/smstopup/user/${userId}`);
    }

    saveCustomer(formValue: any): Observable<boolean>  {
        console.log("oiokokok ", formValue);
        delay(1000);
        return of(false);
    }

    getSmsCost() : Observable<SmsCostModel> {
        
        return of(
            {
                totalNumber: 10, 
                validNumber: 10,
                invalidNumber: 0,
                cost: 90 
            }
        )
    }
}