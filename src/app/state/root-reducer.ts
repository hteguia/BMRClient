import { createReducer, on } from "@ngrx/store";
import { changeBreadcrump } from './root-action';

export interface state{
    root:{
        title: string;
        links:Array<{title:string; link:string}>;
    }
};

const breadcrumbState = {
    title: "Titre de la page",
    links: [
        { title:"Home", link:"/" },
        { title:"Dashboard", link:"/" },
    ]
}
export const rootReducer = createReducer(breadcrumbState,
    on(changeBreadcrump, (state, props)=>{
        return {
            ...state,
            title:props.title,
            links:props.links,
        }
    }));

