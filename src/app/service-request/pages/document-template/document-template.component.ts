import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';
import { DataGridColumn } from 'src/app/shared/models/data-grid-column.model';
import { DocumentTemplateModel } from '../../models/document-template.model';
import { DocumentTemplateService } from '../../services/document-template.service';
import { LogService } from 'src/app/core/services/log.service';
import { FileService } from 'src/app/core/services/file.service';

@Component({
  selector: 'app-document-template',
  templateUrl: './document-template.component.html',
  styleUrls: ['./document-template.component.css']
})
export class DocumentTemplateComponent {
  columns: DataGridColumn[] = [
    { dataField: "name",caption:"Libelle", dataType:"string", visible:true }
  ];
  contextMenuItems = [
    { text: 'Télécharger', code:'DOWNLOAD' },
  ];
  selectedRows = [];
  listItemAnimateState = 'default';

  showFilterModel = false;

  topups$!: Observable<DocumentTemplateModel[]>;

  constructor(private route: ActivatedRoute,  
    private router: Router, private breadcrumpService: BreadcrumpService){  
}

  private documentTemplateService = inject(DocumentTemplateService);
  private logService = inject(LogService);
  private fileService = inject(FileService);

ngOnInit(): void {
  this.topups$ = this.route.data.pipe(
    map(data => data['listDocumentTemplate'])
  );  

  this.breadcrumpService.setBreadcrump("Liste des modéle de document", [
    { title:"Demande de service", link:"/" }, 
    { title:"Modéle de document", link:"/" }
  ]);
}

onFilterDataGrid(){
  this.showFilterModel = !this.showFilterModel;
}

onAddNewCustomer(){
  this.router.navigateByUrl('/sms/topup/add');
}

onContextMenuClick(event: any){
  if(event.action.code === 'DOWNLOAD'){
    this.documentTemplateService.getDocumentTemplate(event.id).subscribe(
      (response: any) => {
        this.documentTemplateService.downloadDocumentTemplate(event.id).subscribe(async (event) => {
          this.fileService.download({event:event, name:response.name});
       });
      },
      (error: any)=>{
        console.log(error);
      }
    )
  }
}

onRowClick(event: any){
 
}

onSelectRow(rows: []){
  this.selectedRows = rows;
}
}
