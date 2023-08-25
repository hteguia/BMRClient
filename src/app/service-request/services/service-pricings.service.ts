import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ServiceType } from "../models/service-type.model";
import { ServicePricing } from "../models/service-pricing.model";


@Injectable()
export class ServicePricingsService{
    constructor(private http: HttpClient) {}

    getServicePricings(): Observable<ServicePricing[]> {
        return this.http.get<ServicePricing[]>(`${environment.apiUrl}/servicePricings`);
    }

    
}