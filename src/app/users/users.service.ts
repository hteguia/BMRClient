import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, catchError, of } from "rxjs";
import { CollaboraterModel, PartnerModel, RoleModel, StudentModel } from "./users.model";


@Injectable()
export class UsersService {

    constructor(private http: HttpClient) {}

    getAllStudent(): Observable<StudentModel[]> {
        return this.http.get<StudentModel[]>(`${environment.apiUrl}/v1/student`).pipe(
            catchError(this.handleError<StudentModel[]>('getAllStudent', []))
        );
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

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
    
            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);
    
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}