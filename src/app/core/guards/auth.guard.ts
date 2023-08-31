import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "src/app/auth/services/auth.service";

@Injectable({
    providedIn : 'root'
})
export class AuthGuard implements CanActivate{
    constructor(private auth: AuthService,
                private router: Router){
                    
                }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {      
        if(this.auth.token){
            return true;
        }else{
            this.router.navigateByUrl('/auth/login');
            return false;
        }
    }
    
   

}