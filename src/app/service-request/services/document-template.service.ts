import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { DocumentTemplateModel } from "../models/document-template.model";


@Injectable()
export class DocumentTemplateService {

    constructor(private http: HttpClient) {}

    getAllDocumentTemplate(): Observable<DocumentTemplateModel[]> {
        return this.http.get<DocumentTemplateModel[]>(`${environment.apiUrl}/v1/documenttemplate`);
    }
}