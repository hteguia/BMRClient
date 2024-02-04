import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    saveData(key:string, data: any){
      localStorage.setItem(key, JSON.stringify(data));
    }

    getData(key:string){
      return JSON.parse(this.userData(key))
    }
    
    private userData(key:string) :any {
      return localStorage.getItem(key);
    }
}