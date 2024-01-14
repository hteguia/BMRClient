import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { AuthService } from 'src/app/auth/services/auth.service';
import { DocumentTypeService } from "../services/document-type.service";
import { DocumentTypeModel } from "../models/document-type.model";



@Injectable()
export class DocumentTypeResolver implements Resolve<DocumentTypeModel[]>{
    constructor(private authService: AuthService, private documentTypeService: DocumentTypeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DocumentTypeModel[]> {
        return this.documentTypeService.getAllDocumentType();
    }

}