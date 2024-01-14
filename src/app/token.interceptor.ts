import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth/services/auth.service';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, private router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.token}`
      }
    });
    return next.handle(request);
    /*
    return next.handle(request).pipe(tap(()=>{ },
        (err: any) => {
          console.log("return intercep "+JSON.stringify(err));
          if (err instanceof HttpErrorResponse) {
            console.log("return intercep "+err);
            if (err.status !== 401) {
            return;
            }
            this.router.navigate(['auth/login']);
          }
        }
      )
    );*/
  }
}