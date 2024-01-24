import { Injectable, inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, mapTo, of, tap, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { PartnerModel } from "../models/partner.model";
import { LogService } from "src/app/core/services/log.service";


@Injectable()
export class PartnerService {
    private logService = inject(LogService);
    
    constructor(private http: HttpClient) {}

    getAllPartner(): Observable<PartnerModel[]> {
        return this.http.get<PartnerModel[]>(`${environment.apiUrl}/v1/partner`);
    }

    getPartner(id: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/v1/partner/${id}`);
    }

    addPartner(formValue: any): Observable<any>  {
        this.logService.log(formValue)
        return this.http.post(`${environment.apiUrl}/v1/partner`, formValue);
    }

    updatePartner(formValue: any): Observable<any>  {
        return this.http.put(`${environment.apiUrl}/v1/partner`, formValue);
    }
}