import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from "rxjs";
import { environment } from "src/environments/environment";




@Injectable({providedIn: 'root'})
export class UserService {

    constructor(private http: HttpClient) {}

    getUserProfil(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}//v1/user`);
    }
}