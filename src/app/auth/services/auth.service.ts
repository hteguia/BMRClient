import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AnyFn } from "@ngrx/store/src/selector";
import { Observable, catchError, of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
  constructor(private http: HttpClient) {}
  
    login(data: {email: string, password: string}): Observable<any> {
      return this.http.post<any>(`${environment.apiUrl}/Account/Authenticate`,data).pipe(
        catchError(error => {
          return of(false);
        })
      );
    }

    register(data: any): Observable<any> {
      return this.http.post<any>(`${environment.apiUrl}/Account/register`,data);
    }

    confirmRegister(userId:string, token:string): Observable<boolean> {
      return this.http.get<boolean>(`${environment.apiUrl}/Account/confirm-email?userId=${userId}&token=${token}`).pipe(
        catchError(error => {
          return of(false);
        })
      );
  }
  
    setToken(token: string){
      localStorage.setItem('access_token', token);
    }

    get token(){
      return localStorage.getItem('access_token')
    }

    setUserData(user: {email:string, firstName:string, lastName:string, role:string, createAt: string, imageUrl:string}){
      localStorage.setItem('user_data', JSON.stringify(user));
    }
    

    get currentUser(){
      return JSON.parse(this.userData)
    }

    get userData() :any {
      return localStorage.getItem('user_data');
    }

    logout(){
      this.clearLSwithoutExcludedKey()
    }

    private clearLSwithoutExcludedKey() {
      const excludedKey = '';
      const keys = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        keys.push(key)
      }
      const clearables = keys.filter(key => key !== excludedKey)
      clearables.forEach(key => localStorage.removeItem(key!))
    }
}