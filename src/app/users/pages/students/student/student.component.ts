import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { StudentModel } from '../../../models/student.model';
import { DataGridColumn } from 'src/app/shared/models/data-grid-column.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  columns: DataGridColumn[] = [
    { dataField: "lastName",caption:"Noms", dataType:"string", visible:true },
    { dataField: "firstName",caption:"Prénoms", dataType:"string", visible:true },
    { dataField: "phoneNumber",caption:"Téléphone", dataType:"string", visible:true },
    { dataField: "email",caption:"Email", dataType:"string", visible:true },
    { dataField: "faculty",caption:"Faculté", dataType:"string", visible:true },
    { dataField: "category",caption:"Catégorie", dataType:"string", visible:true },
    { dataField: "partner",caption:"Partenaire", dataType:"string", visible:true },
  ];
  selectedRows = [];
  listItemAnimateState = 'default';

  showFilterModel = false;

  topups$!: Observable<StudentModel[]>;

  constructor(private route: ActivatedRoute,  
    private router: Router, private breadcrumpService: BreadcrumpService){  
}

ngOnInit(): void {
  this.topups$ = this.route.data.pipe(
    map(data => data['data'])
  );  

  this.breadcrumpService.setBreadcrump("Liste des étudiants", [
    { title:"Utilisateurs", link:"/" }, 
    { title:"Etudiants", link:"/" }
  ]);
}

onFilterDataGrid(){
  this.showFilterModel = !this.showFilterModel;
}

onAddNewCustomer(){
  this.router.navigateByUrl('/sms/topup/add');
}

onRowClick(event: any){
 
}

onSelectRow(rows: []){
  this.selectedRows = rows;
}
}
