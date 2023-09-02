import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, delay, map, mapTo, of, tap } from "rxjs";
import { Role } from "../models/role.model";
import { environment } from "src/environments/environment";
import { User } from "src/app/user/models/user.model";
import { Permission } from "src/app/permission/models/permission.model";

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

    getPermissionInRole(): Observable<Permission[]> {
        return of([
            { id:1, name: "Créer une demande de service" },
            { id:1, name: "Créer un utilisateur" },
            { id:1, name: "Créer une role" },
            { id:1, name: "Attribuer un rôle a un utiisateur" },
            { id:1, name: "Créer un modèle de document" },
            { id:1, name: "Créer un type de document" },
        ])
    }

    getLastRole(): Observable<Role|undefined>{
        return  this.getRoles().pipe(
            map(data => data.pop())
        )
    }
}