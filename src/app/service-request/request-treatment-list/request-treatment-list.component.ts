import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActionTypes, BaseGridPageComponent, DataGridColumn, DisabledTypes } from 'src/app/shared/pages/base-grid-page.component';
import { RequestTreatmentDetail } from '../service-request.model';
import { ServiceRequestService } from '../service.request.service';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';

export const COLUMN_MODERATOR: DataGridColumn[] = [
  { dataField: "createAt",caption:"Date de demande", dataType:"date", template:'dateTemplate', width: 160},
  { dataField: "studentName",caption:"Etudiant", dataType:"string" },
  { dataField: "serviceType",caption:"Type de service", dataType:"string" },
  { dataField: "deadline",caption:"Delai de traitement", dataType:"string" },
  { dataField: "treatmentStatus",caption:"Statut du traitement", dataType:"string", template:'statusTemplate', alignment:'center', width: 175 }
];

@Component({
  selector: 'app-request-treatment-list',
  templateUrl: './request-treatment-list.component.html',
  styleUrls: ['./request-treatment-list.component.css']
})
export class RequestTreatmentListComponent extends BaseGridPageComponent{

  private serviceRequestService = inject(ServiceRequestService);
  private breadcrumpService = inject(BreadcrumpService)
  
  listData$!: Observable<RequestTreatmentDetail[]>;
  
  constructor(route: ActivatedRoute, router: Router){
    super(router, route);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.columns = COLUMN_MODERATOR;

    this.buttonActions = [
      { 
        label: 'Consulter', 
        icon: 'far fa-eye', 
        actionType: ActionTypes.NAVIGUATE_WITH_ID, 
        action: `/service-request/request-treatment/:id/consult`, 
        visibleForRoles: ['MODERATOR'],
        disabled: true,
        disabledType: DisabledTypes.SINGLE
      }
    ];

    this.fetchDatas();

    this.breadcrumpService.setBreadcrump("Liste des demandes de service", [
      { title:"Demande de service", link:"/" }, 
      { title:"Modéle de document", link:"/" }
    ]);
  }

  fetchDatas(): void {
    this.loading = true;
    this.listData$ = this.serviceRequestService.getRequestTreatments()
  }
}
