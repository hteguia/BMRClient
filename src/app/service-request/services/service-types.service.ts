import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ServiceType } from "../models/service-type.model";


@Injectable()
export class ServiceTypesService{
    constructor(private http: HttpClient) {}

    getServiceTypes(): Observable<ServiceType[]> {
        return this.http.get<ServiceType[]>(`${environment.apiUrl}/serviceTypes`);
    }

    
}