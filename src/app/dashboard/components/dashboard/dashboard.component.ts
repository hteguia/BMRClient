import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeBreadcrump } from '../../../state/root-action';
import { Observable, map, tap } from 'rxjs';
import { CollaboraterModel } from 'src/app/users/models/collaborater.model';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { DashboardService } from '../../services/dashboard.service';

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
  data$!: Observable<any>;
  ngOnInit(): void {
    // this.route.data.pipe(
    //   tap(data=>this.storageService.saveData("user_profils", data)),
    //   map(data => data['data'])
    // ).subscribe();  

    this.data$ = this.dashboardService.getDashboardData();
    this.setBreadcrump();
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
}
