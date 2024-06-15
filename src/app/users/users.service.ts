import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { CollaboraterModel, PartnerModel, RoleModel, StudentModel } from "./users.model";


@Injectable()
export class UsersService {

    constructor(private http: HttpClient) {}

    getAllRole(): Observable<RoleModel[]> {
        return this.http.get<RoleModel[]>(`${environment.apiUrl}/Account/role`);
    }

    GetRoleForCreateUser(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/v1/user/GetRoleForCreateUser`);
    }

    getUserProfil(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/v1/user`);
    }


    getAllStudent(): Observable<StudentModel[]> {
        return this.http.get<StudentModel[]>(`${environment.apiUrl}/v1/student`);
    }

    getAllCollaborater(): Observable<CollaboraterModel[]> {
        return this.http.get<CollaboraterModel[]>(`${environment.apiUrl}/v1/collaborater`);
    }

    getAllPartner(): Observable<PartnerModel[]> {
        return this.http.get<PartnerModel[]>(`${environment.apiUrl}/v1/partner`);
    }
}