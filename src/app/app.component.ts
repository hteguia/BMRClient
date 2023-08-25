import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/services/auth.service';
import { Observable, map, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-client';
  appName = environment.appName;

  isLoggedOut$!: Observable<boolean>;
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService){}
  ngOnInit(): void {

    const observer = {
      next: (item:any) => console.log(`une boite arruve ${item}`),
      error: (item:any) => console.log(`une boite erreur  ${item}`),
      complete: () => console.log('une boite complete'),
    }

    const p = of(2, 3, 4);
    const mul = p.pipe(
      map(val => val *2)
    )

    mul.subscribe(console.log);

    // this.isLoggedIn$ = this.authService.isLoggedIn$;
    // this.isLoggedOut$ = this.authService.isLoggedOut$;
    // this.authService.isLoggedIn$.subscribe(console.log)
    // this.authService.isLoggedOut$.subscribe(console.log)
  }
}
