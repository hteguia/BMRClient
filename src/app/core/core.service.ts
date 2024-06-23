import { Injectable, inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from "rxjs";
import { environment } from "src/environments/environment";
import { LogService } from "./services/log.service";

@Injectable({providedIn: 'root'})
export class CoreService {

    private logService = inject(LogService);

    constructor(private http: HttpClient) {}

    getUserProfil(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/v1/user`);
    }

    getDashboardData(): Observable<any> {
        return this.http.get<any>(`${environment.apiUrl}/v1/dashboard`);
    }
}



export function handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
    };
}