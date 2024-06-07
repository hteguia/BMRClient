import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';
import { FileService } from 'src/app/core/services/file.service';
import { ActionTypes, BaseGridPageComponent, DisabledTypes } from 'src/app/shared/pages/base-grid-page/base-grid-page.component';
import { DocumentTemplateModel } from '../models/document-template.model';
import { ServiceRequestService } from '../service.request.service';

@Component({
  selector: 'app-document-model',
  templateUrl: './document-model.component.html',
  styleUrls: ['./document-model.component.css']
})
export class DocumentModelComponent extends BaseGridPageComponent {
  private serviceRequestService = inject(ServiceRequestService);
  private fileService = inject(FileService);

  documentTemplates$!: Observable<DocumentTemplateModel[]>;

  constructor(
    private route: ActivatedRoute,  
    private router: Router, 
    private breadcrumpService: BreadcrumpService)
  {  
      super();

      this.contextMenuItems = [
        { 
          text: 'Télécharger', code:'DOWNLOAD', actionType: ActionTypes.FUNCTION, 
        action: 'DOWNLOAD' },
      ];

      this.columns = [
        { dataField: "name",caption:"Libelle", dataType:"string", visible:true }
      ];

      this.buttonActions = [
        { 
          label: 'Nouveau modèle de document', 
          icon: 'add', 
          actionType: ActionTypes.NAVIGUATE, 
          action: 'service/document-template/add', 
          visibleForRoles: ['SUPERADMIN', 'ADMIN', 'BASIC'],
          disabledType: DisabledTypes.NONE,
          disabled: false 
        }
      ];
  }

  ngOnInit(): void {
    this.fetchListOfDocumentTemplate(); 

    this.breadcrumpService.setBreadcrump("Liste des modéle de document", [
      { title:"Demande de service", link:"/" }, 
      { title:"Modéle de document", link:"/" }
    ]);
  }

  fetchListOfDocumentTemplate(): void {
    this.loading = true;
    this.documentTemplates$ = this.serviceRequestService.getDocumentModel()
  }

  donwloadDocumentTemplate(id: number) {
    this.serviceRequestService.getDocumentModelById(id).subscribe(
      (response: any) => {
        this.serviceRequestService.downloadDocumentModel(id).subscribe(async (event) => {
          this.fileService.download({event:event, name:response.name});
      });
      },
      (error: any)=>{
       console.log(error);
      }
    )
  }

  onActionButtonClick(event: any) {
    console.log("dddddddddddddddd "+event.id)
    if(event.actionType === ActionTypes.NAVIGUATE){
      this.router.navigateByUrl(event.action);
    }

    if(event.actionType === ActionTypes.FUNCTION){
      console.log("dddddddddddddddd "+event.action)
      if(event.action === 'DOWNLOAD'){
        console.log("dddddddddddddddsssssddddd "+event.id)
      this.donwloadDocumentTemplate(event.id)
    }

    if(event.actionType === ActionTypes.API){
      //this[event.action](this.idSelected);
    }   
  }
}
}
