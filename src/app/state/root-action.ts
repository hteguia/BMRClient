import { createAction, props } from "@ngrx/store";

export const changeBreadcrump = createAction("Change breadcrump",props<{title:string, links:Array<{title:string, link:string}>}>());