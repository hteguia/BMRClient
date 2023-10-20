import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { DataGridColumn } from 'src/app/shared/models/data-grid-column.model';
import { RolesService } from '../../services/role.service';
import { Role } from '../../models/role.model';
import { Store } from '@ngrx/store';
import { changeBreadcrump } from 'src/app/state/root-action';
import { animate, state, style, transition, trigger, useAnimation } from '@angular/animations';
import { flashAnimation } from 'src/app/shared/animations/flash.animation';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  animations:[
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        'background-color': 'white',
        'z-index': 1
      })),
      transition('void => *',
      [
        useAnimation(flashAnimation, {
          params: {
            height: 0,
            opacity: 0,
            backgroundColor: 'red',
            time: '1s'
          }
        })
      ])
    ]),
  ]
})
export class RoleComponent implements OnInit {
  columns: DataGridColumn[] = [
    { dataField: "name",caption:"Libelle", dataType:"string", visible:true},
    { dataField: "numberOfUsers",caption:"Nombre d'utilisateur", dataType:"string", visible:true },
  ];
  
  roles$!: Observable<Role[]>;
  selectedRows = [];
  listItemAnimateState = 'default';

  showFilterModel = false;


  constructor(private route: ActivatedRoute, 
              private rolesService: RolesService,  
              private router: Router,
              private store: Store){  
  }

  ngOnInit(): void {
    this.setBreadcrump();
    this.roles$ = this.route.data.pipe(
      map(data => data['roles'])
    );   
  }

  onAddNewRole(){
    this.router.navigateByUrl('/roles/add');
  }

  onSelectRow(rows: []){
    this.selectedRows = rows;
  }

  onFilterDataGrid(){
   
  }

  onRowClick(event: any){
    this.router.navigateByUrl(`roles/${event.id}`);
  }

  private setBreadcrump():void{
    this.store.dispatch(changeBreadcrump(
    {
      title: "Rôles", 
      links:[
        { title:"Home", link:"/" }, 
        { title:"Rôles", link:"/" }
      ]
    }));
  }
}
