import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { DocumentTypeModel } from "../models/document-type.model";

@Injectable()
export class DocumentTypeService {

    constructor(private http: HttpClient) {}

    getAllDocumentType(): Observable<DocumentTypeModel[]> {
        return this.http.get<DocumentTypeModel[]>(`${environment.apiUrl}/v1/documenttype`);
    }
}