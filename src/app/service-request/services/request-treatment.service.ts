import { Injectable, inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { RequestTreatmentModel } from "../models/request-treatment.model";
import { LogService } from "src/app/core/services/log.service";
import { StudentModel } from "src/app/users/models/student.model";
import { FileService } from "src/app/core/services/file.service";

@Injectable()
export class RequestTreatmentService {

    constructor(private http: HttpClient) {}

    private logService = inject(LogService);
    private fileService = inject(FileService);
    
    getAllRequestTreatment(): Observable<RequestTreatmentModel[]> {
        return this.http.get<RequestTreatmentModel[]>(`${environment.apiUrl}/v1/requestTreatment`);
    }

    getRequestTreatmentById(id: any) : Observable<RequestTreatmentModel>{
        return this.http.get<RequestTreatmentModel>(`${environment.apiUrl}/v1/requestTreatment/${id}`);
    }

    getAllRequestTreatmentByStudent(id:number): Observable<RequestTreatmentModel[]> {
        return this.http.get<RequestTreatmentModel[]>(`${environment.apiUrl}/v1/requestTreatment/GetByStudent/${id}`);
    }

    addRequestTreatment(formValue: any): Observable<any>  {
        return this.http.post(`${environment.apiUrl}/v1/requestTreatment`, formValue);
    }

    getAllStudent(): Observable<StudentModel[]> {
        return this.http.get<StudentModel[]>(`${environment.apiUrl}/v1/student`);
    }

    downloadRequestTreatment(id: number, fileName:string):void {
        this.http.get(`${environment.apiUrl}/v1/requestTreatment/DownloadRequestTreatment/${id}`, {
            reportProgress: true,
            observe: 'events',
            responseType: 'blob'
        }).subscribe({
            next: (event) => {
                this.fileService.download({ event:event, name:fileName });
            },
            error: (error) => {
                this.logService.error(error);
            }      
        })
    }

    getStatus(id:number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/v1/requestTreatment/status/${id}`);
    }

    saveStatus(data: { requestTreatmentId: number, status: string, monitorId: number}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/v1/requestTreatment/updatestatus/`, data);
    }

    getRequestTreatmentResult(id: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/v1/requestTreatment/GetResultList/${id}`);
    }

    saveResult(data: { requestTreatmentId: number, files: string[]}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/v1/requestTreatment/SaveResult/`, data);
    }

    getResult(id:number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/v1/requestTreatment/GetResultById/${id}`);
    }

    downloadRequestTreatmentResult(id: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/v1/requestTreatment/DownloadResult/${id}`, {
            reportProgress: true,
            observe: 'events',
            responseType: 'blob'
        })
    }
}