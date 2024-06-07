import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';
import { DocumentTemplateModel } from '../../models/document-template.model';
import { DocumentTemplateService } from '../../services/document-template.service';
import { FileService } from 'src/app/core/services/file.service';
import { ActionTypes, BaseGridPageComponent, DisabledTypes } from 'src/app/shared/pages/base-grid-page/base-grid-page.component';

@Component({
  selector: 'app-document-template',
  templateUrl: './document-template.component.html',
  styleUrls: ['./document-template.component.css']
})
export class DocumentTemplateComponent extends BaseGridPageComponent {
  
  private documentTemplateService = inject(DocumentTemplateService);
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
        action: 'donwloadDocumentTemplate' },
      ];

      this.columns = [
        { dataField: "name",caption:"Libelle", dataType:"string", visible:true }
      ];

      this.buttonActions = [
        { 
          label: 'Nouveau modèle de document', 
          icon: 'add', 
          actionType: ActionTypes.NAVIGUATE, 
          action: '/sms/topup/add', 
          visibleForRoles: ['SUPERADMIN', 'ADMIN', 'BASIC'],
          disabled: false ,
          disabledType: DisabledTypes.NONE
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
    this.documentTemplates$ = this.documentTemplateService.getAllDocumentTemplate()
  }

    donwloadDocumentTemplate(id: number) {
    this.documentTemplateService.getDocumentTemplate(id).subscribe(
      (response: any) => {
        this.documentTemplateService.downloadDocumentTemplate(id).subscribe(async (event) => {
          this.fileService.download({event:event, name:response.name});
      });
      },
      (error: any)=>{
       console.log(error);
      }
    )
  }

  onActionButtonClick(event: any) {
    if(event.actionType === ActionTypes.NAVIGUATE){
      this.router.navigateByUrl(event.action);
    }

    if(event.actionType === ActionTypes.FUNCTION){
      if(event.action === 'donwloadDocumentTemplate'){
      //this[event.action](this.idSelected);
    }

    if(event.actionType === ActionTypes.API){
      //this[event.action](this.idSelected);
    }   
  }
}
}
