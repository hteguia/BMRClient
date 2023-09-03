import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
  constructor(private http: HttpClient) {}
  
    login(data: {email: string, password: string}): Observable<any> {
      return this.http.get<any>(`${environment.apiUrl}/login/1`);
    }
  
    setToken(token: string){
      localStorage.setItem('access_token', token);
    }

    get token(){
      return localStorage.getItem('user_data')
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