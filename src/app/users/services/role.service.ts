import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from "rxjs";
import { environment } from "src/environments/environment";
import { RoleModel } from "../models/role.model";



@Injectable()
export class RoleService {

    constructor(private http: HttpClient) {}

    getAllRole(): Observable<RoleModel[]> {
        return this.http.get<RoleModel[]>(`${environment.apiUrl}/Account/role`);
    }
}