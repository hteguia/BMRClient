import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from "rxjs";
import { environment } from "src/environments/environment";
import { RoleModel } from "../users.model";



@Injectable()
export class RoleService {

    constructor(private http: HttpClient) {}

    getAllRole(): Observable<RoleModel[]> {
        return this.http.get<RoleModel[]>(`${environment.apiUrl}/Account/role`);
    }

    GetRoleForCreateUser(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/v1/user/GetRoleForCreateUser`);
    }
}