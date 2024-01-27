import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { AuthService } from 'src/app/auth/services/auth.service';

import { RequestTreatmentService } from "../services/request-treatment.service";
import { StudentModel } from "src/app/users/models/student.model";



@Injectable()
export class StudentListResolver implements Resolve<StudentModel[]>{
    constructor(private authService: AuthService, private requestTreatmentService: RequestTreatmentService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StudentModel[]> {
        return this.requestTreatmentService.getAllStudent();
    }

}