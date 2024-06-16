import { Injectable, inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthService } from "src/app/auth/services/auth.service";

@Injectable({providedIn: 'root' })
export class UserService{
    private authService = inject(AuthService);
    
    constructor(private store: Store){}

    get role(){
        return this.authService.userProfil.role;
    }
}