import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, mapTo, of } from "rxjs";
import { environment } from "src/environments/environment";
import { ServiceRequest } from "../models/service-request.model";


@Injectable()
export class ServiceRequestsService{
    constructor(private http: HttpClient) {}

    getServiceRequests(): Observable<ServiceRequest[]> {
        return this.http.get<ServiceRequest[]>(`${environment.apiUrl}/serviceRequests`);
    }

    saveServiceRequest(formValue: ServiceRequest) {
        console.log(formValue);
    }
}