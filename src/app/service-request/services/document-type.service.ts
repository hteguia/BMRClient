import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { DocumentTypeModel } from "../models/document-type.model";

@Injectable()
export class DocumentTypeService {

    constructor(private http: HttpClient) {}

    getAllDocumentType(): Observable<DocumentTypeModel[]> {
        return of([
            {
                id: 1,
                name:"ANALYSE STATISTIQUES DES DONNEES",
                description:"Charger un fichier compressé contenant la base de données et le plan"
            },
            {
                id: 2,
                name:"COURS EN LIGNE/PRESENTIEL",
                description:"Charger un fichier compressé contenant la base de données et le plan"
            },
            {
                id: 3,
                name:"DOCUMENT FINAL",
                description:"Charger la dernière version du document final mémoire ou thèse en fic"
            },
            {
                id: 4,
                name:"MASQUE DE SAISIE",
                description:"Charger la dernière version du questionnaire en fichier Word"
            },
            {
                id: 5,
                name:"PROTOCOLE DE RECHERCHE",
                description:"Charger la dernière version du protocole en fichier Word"
            }
        ]);
    }
}