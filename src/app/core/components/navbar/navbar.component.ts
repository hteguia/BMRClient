import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

 currentUser: any;
 
 constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
  }


  
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
