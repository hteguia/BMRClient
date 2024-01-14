import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';
import { DataGridColumn } from 'src/app/shared/models/data-grid-column.model';
import { DocumentTypeModel } from '../../models/document-type.model';

@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.css']
})
export class DocumentTypeComponent {
  columns: DataGridColumn[] = [
    { dataField: "name",caption:"Libelle", dataType:"string", visible:true },
    { dataField: "description",caption:"Description", dataType:"string", visible:true }
  ];
  selectedRows = [];
  listItemAnimateState = 'default';

  showFilterModel = false;

  topups$!: Observable<DocumentTypeModel[]>;

  constructor(private route: ActivatedRoute,  
    private router: Router, private breadcrumpService: BreadcrumpService){  
}

ngOnInit(): void {
  this.topups$ = this.route.data.pipe(
    map(data => data['listDocumentType'])
  );  

  this.breadcrumpService.setBreadcrump("Liste des types de documents", [
    { title:"Demande de service", link:"/" }, 
    { title:"Type de document", link:"/" }
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
