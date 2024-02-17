import { Component, OnInit, inject } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  title = 'angular-client';
  appName = environment.appName;
  loading = false;
  currentUser: any;
  private storageService = inject(StorageService);
  
 constructor(private authService: AuthService, private router: Router){
  this.router.events.subscribe((event: Event) => {
    switch (true) {
      case event instanceof NavigationStart: {
        this.loading = true;
        break;
      }

      case event instanceof NavigationEnd:
      case event instanceof NavigationCancel:
      case event instanceof NavigationError: {
        this.loading = false;
        break;
      }
      default: {
        break;
      }
    }
  });
 }
  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
  }

  hasRole(roles: any):boolean{
    return roles.includes(this.currentUser.role)
  }
}
