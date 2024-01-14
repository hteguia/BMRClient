import { Injectable } from "@angular/core"
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

import { Observable } from "rxjs";
import { AuthService } from 'src/app/auth/services/auth.service';
import { DocumentTypeService } from "../services/document-type.service";
import { DocumentTypeModel } from "../models/document-type.model";
import { DocumentTemplateModel } from "../models/document-template.model";
import { DocumentTemplateService } from "../services/document-template.service";



@Injectable()
export class DocumentTemplateResolver implements Resolve<DocumentTemplateModel[]>{
    constructor(private authService: AuthService, private documentTemplateService: DocumentTemplateService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DocumentTemplateModel[]> {
        return this.documentTemplateService.getAllDocumentTemplate();
    }

}