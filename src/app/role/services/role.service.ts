import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, delay, map, mapTo, of } from "rxjs";
import { Role } from "../models/role.model";
import { environment } from "src/environments/environment";
import { User } from "src/app/user/models/user.model";

@Injectable()
export class RolesService {

    constructor(private http: HttpClient) {}

    getRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(`${environment.apiUrl}/roles`);
    }

    getRoleById(id:number): Observable<Role>{
        return this.http.get<Role[]>(`${environment.apiUrl}/roles`).pipe(
            map(data => data.filter((x)=> x.id == id)[0]),
        )
    }

    getUsersInRole(id: number):Observable<User[]>{
        return of([
            { id:1, firstName: "Hervé", lastName:"KAMDJO", email:"kteguiaherve@gmail.com" },
            { id:2, firstName: "Hervé", lastName:"KAMDJO", email:"kteguiaherve@gmail.com" },
            { id:3, firstName: "Hervé", lastName:"KAMDJO", email:"kteguiaherve@gmail.com" },
            { id:4, firstName: "Hervé", lastName:"KAMDJO", email:"kteguiaherve@gmail.com" },
            { id:5, firstName: "Hervé", lastName:"KAMDJO", email:"kteguiaherve@gmail.com" }
        ])
    }

    saveRole(formValue: Role): Observable<boolean> {
        return this.http.post(`${environment.apiUrl}/roles`, formValue).pipe(
            mapTo(true),
            delay(1000),
            catchError(() => of(false).pipe(
            delay(1000)
            ))
        );
    }
}