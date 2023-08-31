import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  title = 'angular-client';
  appName = environment.appName;

  currentUser: any;
 constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
  }
}
