import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, catchError, retryWhen, switchMap, throwError } from "rxjs";
import { genericRetryPolicy } from "../utilities.service";
import { Injectable } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth.service";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";
import { LogService } from "../log.service";

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor{
  //private authInterceptor = inject(AuthInterceptor);
  //private authService = inject(AuthService);
  //private logService = inject(LogService);
  constructor(private router: Router, private authService: AuthService, private logService: LogService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(environment.apiUrl)) {
      return next.handle(req).pipe(
        retryWhen(genericRetryPolicy({
          excludedStatusCodes: [400, 401, 403, 404, 500]
        })),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            //return this.handleRefrehToken(req, next);
            this.authService.logout();
            this.router.navigateByUrl("auth/login");           
          }
  
          if (error.status === 0 || !navigator.onLine) {
            this.logService.log('Connexion internet perdue!');
            this.authService.logout();
            this.router.navigateByUrl("auth/login");
          }
          const errorMessage = this.setError(error, req);
          return throwError(() => errorMessage);
        })
      )
    }

    return next.handle(req);
    
  }

  handleRefrehToken(request: HttpRequest<any>, next: HttpHandler) {
    console.log('handleRefrehToken');
    return this.authService.sendRefreshToken()
      .pipe(
        switchMap((_data: any) => {
          //return this.authInterceptor.intercept(request, next);
          const authToken = this.authService.accessToken?.token;
          if(authToken){
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${authToken}`
              }
            });
          }
          
          return next.handle(request);
        }),
        catchError(errordata => {
          this.authService.logout();
          //this.messageService.sessionExpired(this.router)
          return throwError(() => errordata)
        })
      );
  }

  /***
   * Set error and check if Client side or Server side Error
   * When No response from the server or server is down => statusCode == 0 && statusText == 'Unknow Error' 
   * When No response from the server and database is down => statusCode == 500 && statusText == 'Internal Server Error' 
   * Ex: CORS block, Internet Failed
   */
  setError(error: HttpErrorResponse, req: any): any {
    let errorMessage = "Oopss... Un problème est survenu !";

    if (error.status === 0) {
      // Client side Error
      errorMessage = 'Une erreur est survenue. Veuillez essayer de nouveau ou contacter le support bmr-africa (support@bmr-africa.com)';
    } else {
      // Server side error
      let serverErrorExist = !!error?.error?.error;

      if (serverErrorExist) {
        errorMessage = error.error.error.message;
      }

      if (error.status === 401) {
        this.authService.logout();
        //this.messageService.authError(this.router)
      }
    }
   
    return error;
  }
}