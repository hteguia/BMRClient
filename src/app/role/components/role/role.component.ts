import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { DataGridColumn } from 'src/app/shared/models/data-grid-column.model';
import { RolesService } from '../../services/role.service';
import { Role } from '../../models/role.model';
import { Store } from '@ngrx/store';
import { changeBreadcrump } from 'src/app/state/root-action';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
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
