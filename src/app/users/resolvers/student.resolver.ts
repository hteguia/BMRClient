import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { AuthService } from 'src/app/auth/services/auth.service';
import { PartnerModel } from "../models/partner.model";
import { PartnerService } from "../services/partner.service";
import { StudentModel } from "../models/student.model";
import { StudentService } from "../services/student.service";



@Injectable()
export class StudentResolver implements Resolve<StudentModel[]>{
    constructor(private authService: AuthService, private studentService: StudentService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StudentModel[]> {
        return this.studentService.getAllStudent();
    }

}