import { Injectable, inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { DocumentTypeModel } from "../models/document-type.model";
import { RequestTreatmentModel } from "../models/request-treatment.model";
import { LogService } from "src/app/core/services/log.service";
import { StudentModel } from "src/app/users/models/student.model";

@Injectable()
export class RequestTreatmentService {

    constructor(private http: HttpClient) {}

    private logService = inject(LogService);
    

    getAllRequestTreatment(): Observable<RequestTreatmentModel[]> {
        return this.http.get<RequestTreatmentModel[]>(`${environment.apiUrl}/v1/requestTreatment`);
    }

    getAllRequestTreatmentByStudent(id:number): Observable<RequestTreatmentModel[]> {
        console.log("eeeeee")
        return this.http.get<RequestTreatmentModel[]>(`${environment.apiUrl}/v1/requestTreatment/GetByStudent/${id}`);
    }

    addRequestTreatment(formValue: any): Observable<any>  {
        console.log(formValue)
        const formData = new FormData();
  
        return this.http.post(`${environment.apiUrl}/v1/requestTreatment`, formValue);
    }

    getAllStudent(): Observable<StudentModel[]> {
        return this.http.get<StudentModel[]>(`${environment.apiUrl}/v1/student`);
    }
}