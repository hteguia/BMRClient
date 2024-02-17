import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

@Injectable()
export class LogService {
   
    log(msg: any, level: "ERROR" | "CRITICAL" | "DEBUG" | "INFO" = "DEBUG") {
        if(environment.production) return;
        
        console.log(level + " : " +new Date() + ": " + JSON.stringify(msg));
    }

    error(msg: any) {
        this.log(msg, "ERROR")
    }

    info(msg: any) {
        this.log(msg, "INFO")
    }

    debug(msg: any) {      
        this.log(msg, "DEBUG")
    }

    critical(msg: any) {
        this.log(msg, "CRITICAL")
    }
}