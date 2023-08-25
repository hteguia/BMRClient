import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataGridColumn } from 'src/app/shared/models/data-grid-column.model';
import { UsersService } from '../../services/users.service';
import { Observable, map } from 'rxjs';
import { User } from '../../models/user.model';
import { Habilitation } from '../../models/habilitation.model';

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

  users!: Observable<User[]>;
  habilitations!: Observable<Habilitation[]>;
  showDelete = true;

  constructor(private route: ActivatedRoute, 
    private usersService: UsersService,  
    private router: Router){  
  }

  ngOnInit(): void {
    this.users = this.route.data.pipe(
      map(data => data['users'])
    ); 
    
    this.habilitations = this.route.data.pipe(
      map(data => data['habilitations'])
    );
  }

  onSelectRow(rows: []){
    this.showDelete = rows.length == 0;
  }
  
}
