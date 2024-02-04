import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).pipe(
      catchError((error) => {
        console.error("1 Error Event");
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
              console.error("Error Event");
          } else {
            console.log(error);
              console.log(`error status : ${error.status} ${error.statusText}`);
              switch (error.status) {
                  case 401:      //login
                      this.router.navigateByUrl("auth/login");
                      break;
                  case 403:     //forbidden
                      this.router.navigateByUrl("/unauthorized");
                      break;
              }
          } 
      } else {
          console.error("some thing else happened");
      }
      
      return throwError(error);
      })
    );
  }
}