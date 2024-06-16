import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from "rxjs";
import { environment } from "src/environments/environment";




@Injectable()
export class DashboardService {

    constructor(private http: HttpClient) {}

    getUserProfil(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/v1/user`);
    }

    getDashboardData(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/v1/dashboard`);
    }
}