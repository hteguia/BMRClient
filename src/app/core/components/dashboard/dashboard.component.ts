import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeBreadcrump } from '../../../state/root-action';
import { Observable, map, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CollaboraterModel } from 'src/app/users/users.model';
import { CoreService } from '../../core.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dashboardService = inject(CoreService) 
  private authService = inject(AuthService);

  topups$!: Observable<CollaboraterModel[]>;

  dashboardData!: any;
  currentUser: any;

  constructor(private store: Store,private route: ActivatedRoute){}
  
  ngOnInit(): void {
    this.dashboardService.getDashboardData().pipe(
      tap((data:any) => this.dashboardData = data)
    ).subscribe();

    this.setBreadcrump();

    this.currentUser = this.authService.userProfil;
  }

  private setBreadcrump():void{
    this.store.dispatch(changeBreadcrump(
      {
        title: "Dashboard", 
        links:[
          { title:"Home", link:"/" }, 
          { title:"Dashboard", link:"/" }
        ]
      }));
  }

  hasRole(roles: any):boolean{
    return roles.includes(this.currentUser.role)
  }
}
