import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from "rxjs";
import { environment } from "src/environments/environment";
import { StudentModel } from "../models/student.model";
import { CollaboraterModel } from "../models/collaborater.model";



@Injectable()
export class CollaboraterService {

    constructor(private http: HttpClient) {}

    getAllCollaborater(): Observable<CollaboraterModel[]> {
        return of([
            {
                id: 1,
                firstName:"Siméone carelle",
                lastName:"ABADA",
                phoneNumber:"237 697783437",
                email:"simeonecarellea@gmail.com",
                role:"MONITEUR"
            }
        ]);
    }

    getCollaborater(id: number): Observable<CollaboraterModel> {
        return of(
            {
                id: 1,
                firstName:"Siméone carelle",
                lastName:"ABADA",
                phoneNumber:"237 697783437",
                email:"simeonecarellea@gmail.com",
                role:"MONITEUR"
            }
        );
    }

    addCollaborater(formValue: any): Observable<boolean>  {
        delay(1000000);
        return of(true);
    }
}