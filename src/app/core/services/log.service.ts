import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

@Injectable()
export class LogService {
   
    log(msg: any, level: "ERROR" | "CRITICAL" | "DEBUG" | "INFO" = "DEBUG") {
        if(environment.production && level === "DEBUG") return;
        
        console.log(level + " : " +new Date() + ": " + JSON.stringify(msg));
    }
}