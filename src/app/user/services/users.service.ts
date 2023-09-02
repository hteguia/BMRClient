import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";


@Injectable()
export class UsersService{
    constructor(private http: HttpClient) {}

    getUsersRole(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}/usersByRole`);
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }
}