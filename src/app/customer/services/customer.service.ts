import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, mapTo, of } from "rxjs";
import { environment } from "src/environments/environment";
import { Customer } from "../models/customer.model";


@Injectable()
export class CustomerService{
    constructor(private http: HttpClient) {}

    getCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(`${environment.apiUrl}/v1/customer`);
    }

    saveCustomer(formValue: any): Observable<boolean>  {
        console.log("oiokokok ", formValue);
        return this.http.post(`${environment.apiUrl}/v1/customer`, formValue).pipe(
            mapTo(true),
            delay(1000),
            catchError(() => of(false).pipe(
              delay(1000)
            ))
          );
       
    }
}