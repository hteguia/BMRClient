import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';
import { DataGridColumn } from 'src/app/shared/models/data-grid-column.model';
import { StudentModel } from 'src/app/users/models/student.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {
  
  columns: DataGridColumn[] = [
    { dataField: "concat:lastName:firstName",caption:"Noms & Prénoms", dataType:"string" },
    { dataField: "email",caption:"Email", dataType:"string"},
    { dataField: "faculty",caption:"Faculté", dataType:"string" },
    { dataField: "category",caption:"Catégorie", dataType:"string"},
    { dataField: "partner",caption:"Partenaire", dataType:"string" },
  ];
  contextMenuItems = [
    { text: 'Consulter les demandes de service', code: 'DEMANDE_SERVICE' },
  ];
  selectedRows = [];
  

  listData$!: Observable<StudentModel[]>;

  private breadcrumpService = inject(BreadcrumpService); 

  constructor(private route: ActivatedRoute, private router: Router) {  
  }

  ngOnInit(): void {
    this.listData$ = this.route.data.pipe(
      map(data => data['data'])
    );  

    this.breadcrumpService.setBreadcrump("Liste des étudiants", [
      { title:"Demande de service", link:"/" }, 
      { title:"Demande des étudiants", link:"/" }
    ]);
  }

  onRowClick(event: any) {
    
  }

  onContextMenuClick(event: any){
    console.log(event)
    if(event.action.code === 'DEMANDE_SERVICE'){
      let student;
      this.listData$.pipe(
        tap(data => 
          { 
            student = data.find(x => x.id === event.id)
          })
      )
      this.router.navigateByUrl(`/service-request/student/${event.id}/request-treatment`);
    }
  }
}
