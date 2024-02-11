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
    { dataField: "lastName",caption:"Noms", dataType:"string" },
    { dataField: "firstName",caption:"Prénoms", dataType:"string" },
    { dataField: "phoneNumber",caption:"Téléphone", dataType:"string",  width:200 },
    { dataField: "email",caption:"Email", dataType:"string", },
    { dataField: "role",caption:"Rôle", dataType:"string",  width:150 },
    { dataField: "serviceRequestNotify",caption:"Notification par SMS", dataType:"string",  width:175, template:"statusTemplate", alignment:'center' },
  ];
  selectedRows = [];
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
  if(this.selectedRows.length){
    this.collaboraterService.getCollaborater(this.selectedRows[0]).subscribe(result=>{
      this.router.navigateByUrl('/users/collaborater/update', { state: result });
    });
  }
}

onRowClick(event: any){
 
}

  onSelectRow(rows: []){
      this.selectedRows = rows;
      this.displayUpdateButton = +rows.length === 1;
  }
}
