import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { AuthService } from 'src/app/auth/services/auth.service';
import { PartnerModel } from "../models/partner.model";
import { PartnerService } from "../services/partner.service";
import { StudentModel } from "../models/student.model";
import { StudentService } from "../services/student.service";
import { CollaboraterService } from "../services/collaborater.service";
import { CollaboraterModel } from "../models/collaborater.model";



@Injectable()
export class CollaboraterResolver implements Resolve<CollaboraterModel[]>{
    constructor(private authService: AuthService, private collaboraterService: CollaboraterService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<CollaboraterModel[]> {
        return this.collaboraterService.getAllCollaborater();
    }

}