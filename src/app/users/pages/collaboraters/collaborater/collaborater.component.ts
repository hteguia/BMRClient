import { Component, inject } from '@angular/core';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { DataGridColumn } from 'src/app/shared/models/data-grid-column.model';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CollaboraterModel } from 'src/app/users/models/collaborater.model';
import { CollaboraterService } from 'src/app/users/services/collaborater.service';
import { LogService } from 'src/app/core/services/log.service';

@Component({
  selector: 'app-collaborater',
  templateUrl: './collaborater.component.html',
  styleUrls: ['./collaborater.component.css'],
  animations: [
    trigger('fade', [
      state('hide', style({
        opacity: 0,
      })),
      state('show', style({
        opacity: 1,
      })),
      transition('hide => show', [
        animate('0.5s')
      ]),
      transition('show => hide', [
        animate('0.5s')
      ])
    ])
  ]
})
export class CollaboraterComponent {
  columns: DataGridColumn[] = [
    { dataField: "lastName",caption:"Noms", dataType:"string", visible:true },
    { dataField: "firstName",caption:"Prénoms", dataType:"string", visible:true },
    { dataField: "phoneNumber",caption:"Téléphone", dataType:"string", visible:true },
    { dataField: "email",caption:"Email", dataType:"string", visible:true },
    { dataField: "role",caption:"Rôle", dataType:"string", visible:true },
  ];
  selectedRows = [];
  listItemAnimateState = 'default';
  displayUpdateButton = false;

  showFilterModel = false;

  topups$!: Observable<CollaboraterModel[]>;

  private logService = inject(LogService);

  constructor(private route: ActivatedRoute,  
    private router: Router, private breadcrumpService: BreadcrumpService,
    private collaboraterService: CollaboraterService){  
}

ngOnInit(): void {
  
  this.topups$ = this.route.data.pipe(
    map(data => data['data'])
  );  

  this.breadcrumpService.setBreadcrump("Liste des collaborateurs", [
    { title:"Utilisateurs", link:"/" }, 
    { title:"Collaborateurs", link:"/" }
  ]);
}

onFilterDataGrid(){
  this.showFilterModel = !this.showFilterModel;
}
  
onAddNewItem(){
  this.router.navigateByUrl('/users/collaborater/add');
}

onUpdateItem(){
  console.log(this.selectedRows)
  if(this.selectedRows.length){
    console.log(this.selectedRows[0]);
    this.collaboraterService.getCollaborater(this.selectedRows[0]).subscribe(result=>{
      this.logService.log(result);
      this.router.navigateByUrl('/users/collaborater/add', { state: result });
    });
  }
}

onRowClick(event: any){
 
}

onSelectRow(rows: []){
  this.selectedRows = rows;
  this.displayUpdateButton = rows.length > 0;
}
}
