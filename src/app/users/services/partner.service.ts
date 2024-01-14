import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from "rxjs";
import { environment } from "src/environments/environment";
import { PartnerModel } from "../models/partner.model";


@Injectable()
export class PartnerService {

    constructor(private http: HttpClient) {}

    getAllPartner(): Observable<PartnerModel[]> {
        return of([
            {
                id: 1,
                name:"EDIE MESUMBE ETUDIANT CAMSA",
            }
        ]);
    }

    getPartner(id: number): Observable<PartnerModel> {
        console.log("this.selectedRows")
        return of(
            {
                id: 1,
                name:"EDIE MESUMBE ETUDIANT CAMSA",
            }
        );
    }

    addPartner(formValue: any): Observable<boolean>  {
        delay(1000000);
        return of(true);
    }

    updatePartner(formValue: any): Observable<boolean>  {
        delay(1000000);
        return of(true);
    }
}