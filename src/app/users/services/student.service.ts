import { Injectable, inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { LogService } from "src/app/core/services/log.service";
import { StudentModel } from "../users.model";



@Injectable()
export class StudentService {

    constructor(private http: HttpClient) {}

    private logService = inject(LogService);
    private logClassName = "Student service ";
    
    getAllStudent(): Observable<StudentModel[]> {
        return this.http.get<StudentModel[]>(`${environment.apiUrl}/v1/student`);
    }

    getStudent(id: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/v1/student/${id}`);
    }

    addStudent(formValue: any): Observable<any>  {
        return this.http.post(`${environment.apiUrl}/v1/student`, formValue);
    }

    updateStudent(formValue: any): Observable<any>  {
        return this.http.put(`${environment.apiUrl}/v1/student`, formValue);
    }
}