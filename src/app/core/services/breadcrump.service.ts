import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { changeBreadcrump } from "src/app/state/root-action";

@Injectable()
export class BreadcrumpService{
    constructor(private store: Store){}

    setBreadcrump(title: string, links:any[]):void {
        this.store.dispatch(changeBreadcrump(
        {
            title: title, 
            links:links
        }));
    }
}