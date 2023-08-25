import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Role } from "../models/role.model";
import { Habilitation } from "../models/habilitation.model";


@Injectable()
export class RolesService{
    constructor(private http: HttpClient) {}

    getRoles(): Observable<Role[]> {
        return this.http.get<Role[]>(`${environment.apiUrl}/roles`);
    }

    getHabilitations(): Observable<Habilitation[]>{
        return this.http.get<Habilitation[]>(`${environment.apiUrl}/habilitationsByRole`);
    }
}