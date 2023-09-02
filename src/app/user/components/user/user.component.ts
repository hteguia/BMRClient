import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataGridColumn } from 'src/app/shared/models/data-grid-column.model';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Store } from '@ngrx/store';
import { changeBreadcrump } from 'src/app/state/root-action';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  columns: DataGridColumn[] = [
    { dataField: "firstName",caption:"Libelle", dataType:"string"},
    { dataField: "lastName",caption:"Libelle", dataType:"string"},
    { dataField: "concat:lastName:firstName",caption:"Noms & Prénoms", dataType:"string", visible:true},
    { dataField: "email",caption:"Email", dataType:"string", visible:true },
    { dataField: "phoneNumber",caption:"Téléphone", dataType:"string", visible:true },
    { dataField: "role",caption:"Droits d'accès", dataType:"string", visible:true },
    { dataField: "role",caption:"Status", dataType:"string", visible:true },
  ];
  
  users$!: Observable<User[]>;
  selectedRows = [];
  listItemAnimateState = 'default';

  showFilterModel = false;


  constructor(private route: ActivatedRoute, 
              private rolesService: UsersService,  
              private router: Router,
              private store: Store){  
  }

  ngOnInit(): void {
    this.setBreadcrump();
    
    this.users$ = this.route.data.pipe(
      map(data => data['users'])
    );   
  }

  onAddNewUser(){
    this.router.navigateByUrl('/users/add');
  }

  onSelectRow(rows: []){
    
  }

  onFilterDataGrid(){
   
  }

  onRowClick(event: any){
    
  }

  private setBreadcrump():void{
    this.store.dispatch(changeBreadcrump(
      {
        title: "Utilisateurs", 
        links:[
          { title:"Home", link:"/" }, 
          { title:"Utilisateurs", link:"/" }
        ]
      }));
  }
}
