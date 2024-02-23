import { Component, ElementRef, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/auth/components/change-password/change-password.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

 currentUser: any;
 @ViewChild('dropdown') dropdown!: ElementRef;
 
 constructor(private authService: AuthService, private router: Router, public dialog: MatDialog, private renderer: Renderer2){}

  ngOnInit(): void {
    this.currentUser = this.authService.userProfil;
  }

  isDropdownVisible = false;
  toggleDropdown() {
    if (this.dropdown.nativeElement.classList.contains('show')) {
      this.renderer.removeClass(this.dropdown.nativeElement, 'show');
    } else {
      this.renderer.addClass(this.dropdown.nativeElement, 'show');
    }
  }

  private openChangeForm(title:string){
    this.toggleDropdown();
    this.authService.generateTokenResetPassword(this.currentUser.email).subscribe({
      next: (data) => {
        console.log("eeeee")
        const dialogRef = this.dialog.open(ChangePasswordComponent, {
          data: 
          {
            data: data,
            title:title
          }, 
          minWidth: '500px'
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if(result === "RELOAD_GRID"){
            
          }
        });
      },
      error: (error) => {
        console.log(error);
      }
    })
    
  }
  
  changePassword(){
    this.openChangeForm('Changer le mot de passe');
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }
}
