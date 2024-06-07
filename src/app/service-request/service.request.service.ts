import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DocumentModel, StudentRequest } from "./service-request.model";
import { StudentModel } from "../users/models/student.model";

@Injectable()
export class ServiceRequestService 
{
    constructor(private http: HttpClient) {}   
       
    addDoumentModel(formValue: any): Observable<any>  {
        return this.http.post(`${environment.apiUrl}/v1/documenttemplate`, formValue);
    }

    getDocumentModel(): Observable<DocumentModel[]> {
        return this.http.get<DocumentModel[]>(`${environment.apiUrl}/v1/documenttemplate`);
    }

    getDocumentModelById(id: number): Observable<DocumentModel> {
        return this.http.get<DocumentModel>(`${environment.apiUrl}/v1/documenttemplate/${id}`);
    }

    downloadDocumentModel(id: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/v1/documenttemplate/DownloadDocumentTemplate/${id}`, 
        {
            reportProgress: true,
            observe: 'events',
            responseType: 'blob'
        })
    }




    getStudentRequests(): Observable<StudentRequest[]> {
        return this.http.get<StudentRequest[]>(`${environment.apiUrl}/v1/student`);
    }
}