import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, of, tap } from "rxjs";
import { LogService } from "src/app/core/services/log.service";
import { StorageService } from "src/app/core/services/storage.service";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
  private logService = inject(LogService);
  private storageService = inject(StorageService);

  constructor(private http: HttpClient) {}
    
  login(data: {email: string, password: string}): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Account/Authenticate`,data, {withCredentials: true}).pipe(
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

  generateTokenResetPassword(email: string): Observable<string> {
    return this.http.get<string>(`${environment.apiUrl}/Account/password-reset-token?email=${email}`);
  }

  ResetPassword(data:{email:string, token:string, password:string, confirmPassword:string}): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/Account/reset-password`, data);
  }

  sendRefreshToken(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/user/jwt/refreshToken?refreshToken=${this.accessToken.refreshToken}`)
      .pipe(
        tap(({ accessToken, refreshToken }) => {
          this.saveAccessToken({token: accessToken, refreshToken: refreshToken});
        })
      )
  }

  saveAccessToken(accessToken: { token: string, refreshToken: string }){
    this.storageService.saveData('access_token', accessToken);
  }

  saveUserPofils(user: any){
    this.storageService.saveData('user_profil', user);
  }

  get accessToken():any {
    return this.storageService.getData('access_token');
  }

  get userProfil():any {
    return this.storageService.getData('user_profil');
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

  getUserProfil(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/v1/user`);
  }
}