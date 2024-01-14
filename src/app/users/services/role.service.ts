import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from "rxjs";
import { environment } from "src/environments/environment";
import { StudentModel } from "../models/student.model";
import { CollaboraterModel } from "../models/collaborater.model";
import { RoleModel } from "../models/role.model";



@Injectable()
export class RoleService {

    constructor(private http: HttpClient) {}

    getAllRole(): Observable<RoleModel[]> {
        return of([
            {
                id: 1,
                name:"ADMINISTRATEUR",
            },
            {
                id: 2,
                name:"MONITEUR",
            }
        ]);
    }
}