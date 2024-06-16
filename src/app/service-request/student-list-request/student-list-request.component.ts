import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';
import { ServiceRequestService } from '../service.request.service';
import { Observable } from 'rxjs';
import { StudentRequest } from '../service-request.model';
import { ActionTypes, BaseGridPageComponent, DisabledTypes } from 'src/app/shared/pages/base-grid-page.component';

@Component({
  selector: 'app-student-list-request',
  templateUrl: './student-list-request.component.html',
  styleUrls: ['./student-list-request.component.css']
})
export class StudentListRequestComponent extends BaseGridPageComponent {
  private serviceRequestService = inject(ServiceRequestService);

  studentRequests$!: Observable<StudentRequest[]>;

  constructor(route: ActivatedRoute, router: Router, private breadcrumpService: BreadcrumpService)
  {  
    super(router, route);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    
    this.breadcrumpService.setBreadcrump("Liste des étudiants", [
      { title:"Demande de service", link:"/" }, 
      { title:"Modéle de document", link:"/" }
    ]);

    this.columns = [
      { dataField: "concat:lastName:firstName",caption:"Noms & Prénoms", dataType:"string" },
      { dataField: "email", caption:"Email", dataType:"string", visible:true },
      { dataField: "partner", caption:"Partenaire", dataType:"string", visible:true },
      { dataField: "numberOfRequests",caption:"Nombre de demande", dataType:"string" },
    ];

    this.buttonActions = [
      { 
        label: 'Liste les demandes de service', 
        icon: 'fas fa-list', 
        actionType: ActionTypes.NAVIGUATE_WITH_ID, 
        action: '/service-request/student/:id/request-treatment', 
        visibleForRoles: ['SUPERADMIN', 'ADMIN', 'BASIC'],
        disabled: true,
        disabledType: DisabledTypes.SINGLE 
      }
    ];

    this.fetchDatas();
  }

  fetchDatas(): void {
    this.loading = true;
    this.studentRequests$ = this.serviceRequestService.getStudentRequests()
  }
}
