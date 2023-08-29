import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private token!: string;

    login(data: {email: string, password: string}): Observable<boolean> {
      this.token = 'MyFakeToken';
      return of(true);
    }
  
    getToken(): string {
      return this.token;
    }
}