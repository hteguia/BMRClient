import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Role } from '../../models/role.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from '../../services/roles.service';
import { DataGridColumn } from 'src/app/shared/models/data-grid-column.model';

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
  
  roles!: Observable<Role[]>;
  selectedRows = [];
  listItemAnimateState = 'default';

  showFilterModel = false;


  constructor(private route: ActivatedRoute, 
              private rolesService: RolesService,  
              private router: Router){  
  }

  ngOnInit(): void {
    this.roles = this.route.data.pipe(
      map(data => data['roles'])
    );   
  }

  onAddNewRole(){
    this.router.navigateByUrl('/service-request/add-service-request');
  }

  onSelectRow(rows: []){
    //this.selectedRows = rows;
  }

  onFilterDataGrid(){
   // this.showFilterModel = !this.showFilterModel;
  }

  onRowClick(event: any){
    this.router.navigateByUrl(`users/roles/${event.id}`);
  }
}
