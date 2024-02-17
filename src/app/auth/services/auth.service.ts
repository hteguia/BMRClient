import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { AnyFn } from "@ngrx/store/src/selector";
import { Observable, catchError, of, tap } from "rxjs";
import { LogService } from "src/app/core/services/log.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
  private logService = inject(LogService);

  constructor(private http: HttpClient) {}
    
  login(data: {email: string, password: string}): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Account/Authenticate`,data).pipe(
      catchError(error => {
        this.logService.error(error);
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

  sendRefreshToken(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/user/jwt/refreshToken?refreshToken=${this.refreshToken}`)
      .pipe(
        tap(({ accessToken, refreshToken }) => {
          this.setToken({token: accessToken, refreshToken: refreshToken});
        })
      )
  }

  setToken(token: {token: string, refreshToken: string}) {
    let user = this.currentUser;
    user.accessToken = token.token;
    user.refreshToken = token.refreshToken;
    this.setUserData(user);
  }

  get token(){
    return  this.currentUser ? this.currentUser.accessToken : '';
  }

  get refreshToken(){
    return  this.currentUser ? this.currentUser.refreshToken : '';
  }

  setUserData(user: any){
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