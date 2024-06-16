import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeBreadcrump } from '../../../state/root-action';
import { Observable, map, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { DashboardService } from '../../dashboard.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CollaboraterModel } from 'src/app/users/users.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private store: Store,private route: ActivatedRoute){}
  topups$!: Observable<CollaboraterModel[]>;
  private storageService = inject(StorageService)
  private dashboardService = inject(DashboardService)
  dashboardData!: any;
  currentUser: any;
  private authService = inject(AuthService);
  ngOnInit(): void {
    // this.route.data.pipe(
    //   tap(data=>this.storageService.saveData("user_profils", data)),
    //   map(data => data['data'])
    // ).subscribe();  
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
