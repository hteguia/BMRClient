import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { CollaboraterModel, PartnerModel, RoleModel, StudentModel } from "./users.model";


@Injectable()
export class UsersService {

    constructor(private http: HttpClient) {}

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


    getAllRole(): Observable<RoleModel[]> {
        return this.http.get<RoleModel[]>(`${environment.apiUrl}/Account/role`);
    }

    GetRoleForCreateUser(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/v1/user/GetRoleForCreateUser`);
    }

    getUserProfil(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/v1/user`);
    }


    

    getAllCollaborater(): Observable<CollaboraterModel[]> {
        return this.http.get<CollaboraterModel[]>(`${environment.apiUrl}/v1/collaborater`);
    }

    getCollaborater(id: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/v1/collaborater/${id}`);
    }

    addCollaborater(formValue: any): Observable<any>  {
        return this.http.post(`${environment.apiUrl}/v1/collaborater`, formValue);
    }

    updateCollaborater(formValue: any): Observable<any>  {
        return this.http.put(`${environment.apiUrl}/v1/collaborater`, formValue);
    }

    ResetPasswordCollaborater(formValue: {id:number}): Observable<any>  {
        return this.http.post(`${environment.apiUrl}/v1/collaborater/ResetPasswordCollaborater`, formValue);
    }




    getAllPartner(): Observable<PartnerModel[]> {
        return this.http.get<PartnerModel[]>(`${environment.apiUrl}/v1/partner`);
    }

    getPartner(id: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/v1/partner/${id}`);
    }

    addPartner(formValue: any): Observable<any>  {
        return this.http.post(`${environment.apiUrl}/v1/partner`, formValue);
    }

    updatePartner(formValue: any): Observable<any>  {
        return this.http.put(`${environment.apiUrl}/v1/partner`, formValue);
    }
}