import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';
import { DataGridColumn } from 'src/app/shared/models/data-grid-column.model';
import { DocumentTemplateModel } from '../../models/document-template.model';

@Component({
  selector: 'app-document-template',
  templateUrl: './document-template.component.html',
  styleUrls: ['./document-template.component.css']
})
export class DocumentTemplateComponent {
  columns: DataGridColumn[] = [
    { dataField: "name",caption:"Libelle", dataType:"string", visible:true }
  ];
  selectedRows = [];
  listItemAnimateState = 'default';

  showFilterModel = false;

  topups$!: Observable<DocumentTemplateModel[]>;

  constructor(private route: ActivatedRoute,  
    private router: Router, private breadcrumpService: BreadcrumpService){  
}

ngOnInit(): void {
  this.topups$ = this.route.data.pipe(
    map(data => data['listDocumentTemplate'])
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
