import { Injectable } from '@angular/core';

@Injectable()
export class LogService {
    log(msg: any, level: "ERROR" | "CRITICAL" | "DEBUG" | "INFO" = "DEBUG") {
        console.log(level + " : " +new Date() + ": " + JSON.stringify(msg));
    }
}