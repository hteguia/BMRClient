import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.accessToken?.token;
      if(authToken){
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`
          }
        });
      }
      
      return next.handle(req);
  }
}
