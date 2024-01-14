import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { StudentModel } from "../models/student.model";



@Injectable()
export class StudentService {

    constructor(private http: HttpClient) {}

    getAllStudent(): Observable<StudentModel[]> {
        return of([
            {
                id: 1,
                firstName:"Siméone carelle",
                lastName:"ABADA",
                phoneNumber:"237 697783437",
                email:"simeonecarellea@gmail.com",
                faculty:"FMSB",
                category:"Interne",
                partner:"EDIE MESUMBE ETUDIANT CAMSA",
            }
        ]);
    }
}