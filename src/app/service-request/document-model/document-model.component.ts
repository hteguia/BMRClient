import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';
import { ServiceRequestService } from '../service.request.service';
import { DocumentTemplateModel } from '../service-request.model';
import { ActionTypes, BaseGridPageComponent, DisabledTypes } from 'src/app/shared/pages/base-grid-page.component';

@Component({
  selector: 'app-document-model',
  templateUrl: './document-model.component.html',
  styleUrls: ['./document-model.component.css']
})
export class DocumentModelComponent extends BaseGridPageComponent {
  private serviceRequestService = inject(ServiceRequestService);

  documentTemplates$!: Observable<DocumentTemplateModel[]>;

  constructor(
    route: ActivatedRoute,  
    router: Router, 
    private breadcrumpService: BreadcrumpService)
  {  
      super(router, route);

      this.contextMenuItems = [
        { text: 'Télécharger', code:'DOWNLOAD', actionType: ActionTypes.FUNCTION, action: 'DOWNLOAD' },
      ];

      this.columns = [
        { dataField: "name",caption:"Libelle", dataType:"string", visible:true }
      ];

      this.buttonActions = [
        { 
          label: 'Nouveau modèle de document', 
          icon: 'fas fa-plus', 
          actionType: ActionTypes.NAVIGUATE, 
          action: 'service-request/document-template/add', 
          visibleForRoles: ['SUPERADMIN', 'ADMIN', 'BASIC'],
          disabledType: DisabledTypes.NONE,
          disabled: false, 
        },
        { 
          label: 'Telecharger', 
          icon: 'fas fa-download', 
          actionType: ActionTypes.FUNCTION, 
          action: "donwloadDocumentTemplate", 
          visibleForRoles: ['SUPERADMIN', 'ADMIN', 'BASIC'],
          disabledType: DisabledTypes.SINGLE,
          disabled: true, 
        }
      ];
  }

  override ngOnInit(): void {
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
    this.serviceRequestService.downloadDocumentModel(id);
  }
}
