import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../services/role.service';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/user/models/user.model';
import { DataGridColumn } from 'src/app/shared/models/data-grid-column.model';
import { Permission } from 'src/app/permission/models/permission.model';
import { Role } from '../../models/role.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-role',
  templateUrl: './single-role.component.html',
  styleUrls: ['./single-role.component.css']
})
export class SingleRoleComponent implements OnInit{

  columns: DataGridColumn[] = [
    { dataField: "firstName",caption:"Noms", dataType:"string"},
    { dataField: "lastName",caption:"Prénoms", dataType:"string"},
    { dataField: "concat:lastName:firstName",caption:"Noms & Prénoms", dataType:"string", visible:true  },
    { dataField: "email",caption:"Email", dataType:"string", visible:true },
  ];


  role!: Role;
  users$!: Observable<User[]>;
  permissions$!: Observable<Permission[]>;
  showDelete = true;
  

  constructor(private roleService: RolesService,
              private route: ActivatedRoute){}

  ngOnInit(): void {
   this.roleService.getRoleById(+this.route.snapshot.paramMap.get('id')!).pipe(
      tap(data => this.role = data)
    ).subscribe();
    this.users$ = this.roleService.getUsersInRole(1);
    this.permissions$ = this.roleService.getPermissionInRole();
  }

  onSelectRow(rows: []){
    this.showDelete = rows.length == 0;
  }
}
