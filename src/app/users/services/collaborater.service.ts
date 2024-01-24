import { Injectable, inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from "rxjs";
import { environment } from "src/environments/environment";
import { StudentModel } from "../models/student.model";
import { CollaboraterModel } from "../models/collaborater.model";
import { LogService } from "src/app/core/services/log.service";



@Injectable()
export class CollaboraterService {

    constructor(private http: HttpClient) {}

    private logService = inject(LogService);

    getAllCollaborater(): Observable<CollaboraterModel[]> {
        return this.http.get<CollaboraterModel[]>(`${environment.apiUrl}/v1/collaborater`);
    }

    getCollaborater(id: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/v1/collaborater/${id}`);
    }

    addCollaborater(formValue: any): Observable<any>  {
        this.logService.log(formValue)
        return this.http.post(`${environment.apiUrl}/v1/collaborater`, formValue);
    }

    updateCollaborater(formValue: any): Observable<any>  {
        this.logService.log(formValue)
        return this.http.put(`${environment.apiUrl}/v1/collaborater`, formValue);
    }

}