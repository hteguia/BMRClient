import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, switchMap } from "rxjs";
import { environment } from "src/environments/environment";
import { DocumentModel, DocumentTypeModel, RequestTreatmentDetail, StudentRequest } from "./service-request.model";
import { FileService } from "../core/services/file.service";

@Injectable()
export class ServiceRequestService 
{
    protected fileService = inject(FileService);
    
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

    downloadDocumentModel(id: number): void {
        let fileName = '';
        this.http.get<DocumentModel>(`${environment.apiUrl}/v1/documenttemplate/${id}`).pipe(
            switchMap((response: any) => {
                fileName = response.name;
                return this.http.get(`${environment.apiUrl}/v1/documenttemplate/DownloadDocumentTemplate/${id}`, {
                    reportProgress: true,
                    observe: 'events',
                    responseType: 'blob'
                })
            })
        ).subscribe((response: any) => {
            this.fileService.download({ event:response, name:fileName});
        });
        
    }

    addRequestTreatment(formValue: any): Observable<any>  {
        return this.http.post(`${environment.apiUrl}/v1/requestTreatment`, formValue);
    }

    getStudentRequests(): Observable<StudentRequest[]> {
        return this.http.get<StudentRequest[]>(`${environment.apiUrl}/v1/student`);
    }

    getRequestTreatmentsByStudent(id:number): Observable<RequestTreatmentDetail[]> {
        return this.http.get<RequestTreatmentDetail[]>(`${environment.apiUrl}/v1/requestTreatment/GetByStudent/${id}`);
    }

    getRequestTreatmentById(id: any) : Observable<RequestTreatmentDetail>{
        return this.http.get<RequestTreatmentDetail>(`${environment.apiUrl}/v1/requestTreatment/${id}`);
    }

    getRequestTreatmentStatus(id:number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/v1/requestTreatment/status/${id}`);
    }

    getRequestTreatmentResult(id: number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/v1/requestTreatment/GetResultList/${id}`);
    }

    getRequestTreatmentResultById(id:number): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/v1/requestTreatment/GetResultById/${id}`);
    }

    updateRequestTreatmentStatus(data: { requestTreatmentId: number, status: string, monitorId: number}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/v1/requestTreatment/updatestatus/`, data);
    }

    saveRequestTreatmentResultFile(data: { requestTreatmentId: number, files: string[]}): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/v1/requestTreatment/SaveResult/`, data);
    }

    downloadRequestTreatment(id: number) : void {
        let fileName = '';
        this.http.get<RequestTreatmentDetail>(`${environment.apiUrl}/v1/requestTreatment/${id}`).pipe(
            switchMap((response: any) => {
                fileName = response.fileName;
                return this.http.get(`${environment.apiUrl}/v1/requestTreatment/DownloadRequestTreatment/${id}`, {
                    reportProgress: true,
                    observe: 'events',
                    responseType: 'blob'
                })
            })
        ).subscribe((response: any) => {
            this.fileService.download({ event:response, name:fileName});
        });
    }

    downloadRequestTreatmentResult(id: number) : void{
        let fileName = '';
        this.http.get<any>(`${environment.apiUrl}/v1/requestTreatment/GetResultById/${id}`).pipe(
            switchMap((response: any) => {
                fileName = response.fileName;
                return this.http.get(`${environment.apiUrl}/v1/requestTreatment/DownloadResult/${id}`, {
                    reportProgress: true,
                    observe: 'events',
                    responseType: 'blob'
                })
            })
        ).subscribe((response:any)=>{
            this.fileService.download({ event:response, name:fileName});
        })
    }


    getAllDocumentType(): Observable<DocumentTypeModel[]> {
        return this.http.get<DocumentTypeModel[]>(`${environment.apiUrl}/v1/documenttype`);
    }
}