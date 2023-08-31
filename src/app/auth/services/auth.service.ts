import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    
    login(data: {email: string, password: string}): Observable<boolean> {
      this.setUserData({ email:"kteguiaherve@gmail.com", 
                         firstName:"Hervé", 
                         lastName:"TEGUIA", 
                         role:"ADMINISTRATEUR",
                         createAt:"2020-07-28T14:30:56Z",
                         imageUrl:"https://i.pravatar.cc/100?img=2" 
                        });
      this.setToken('eyJhbGciOiJIUzUxMiJ9');
      return of(true);
    }
  
    setToken(token: string){
      localStorage.setItem('access_token', token);
    }

    get token(){
      return localStorage.getItem('user_data')
    }

    setUserData(user: {email:string, firstName:string, lastName:string, role:string, createAt: string, imageUrl:string}){
      localStorage.setItem('user_data', JSON.stringify(user));
    }

    get currentUser(){
      return JSON.parse(this.userData)
    }

    get userData() :any {
      return localStorage.getItem('user_data');
    }

    logout(){
      this.clearLSwithoutExcludedKey()
    }

    private clearLSwithoutExcludedKey() {
      const excludedKey = '';
      const keys = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        keys.push(key)
      }
      const clearables = keys.filter(key => key !== excludedKey)
      clearables.forEach(key => localStorage.removeItem(key!))
    }
}