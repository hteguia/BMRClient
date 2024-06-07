import { Component, inject } from '@angular/core';
import { ActionTypes, BaseGridPageComponent, DisabledTypes } from 'src/app/shared/pages/base-grid-page/base-grid-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';
import { ServiceRequestService } from '../service.request.service';
import { Observable } from 'rxjs';
import { StudentRequest } from '../service-request.model';

@Component({
  selector: 'app-student-list-request',
  templateUrl: './student-list-request.component.html',
  styleUrls: ['./student-list-request.component.css']
})
export class StudentListRequestComponent extends BaseGridPageComponent {
  private serviceRequestService = inject(ServiceRequestService);

  studentRequests$!: Observable<StudentRequest[]>;

  constructor(private route: ActivatedRoute, private router: Router, private breadcrumpService: BreadcrumpService)
  {  
      super();
      this.columns = [
        { dataField: "concat:lastName:firstName",caption:"Noms & Prénoms", dataType:"string" },
        { dataField: "email", caption:"Email", dataType:"string", visible:true },
        { dataField: "partner", caption:"Partenaire", dataType:"string", visible:true },
        { dataField: "numberOfRequests",caption:"Nombre de demande", dataType:"string" },
      ];

      this.buttonActions = [
        { 
          label: 'Consulter les demandes de service', 
          icon: 'consult', 
          actionType: ActionTypes.NAVIGUATE, 
          action: '/service/request-treatment/student', 
          visibleForRoles: ['SUPERADMIN', 'ADMIN', 'BASIC'],
          disabled: true,
          disabledType: DisabledTypes.SINGLE 
        }
      ];
  }

  ngOnInit(): void {
    this.fetchDatas(); 

    this.breadcrumpService.setBreadcrump("Liste des étudiants", [
      { title:"Demande de service", link:"/" }, 
      { title:"Modéle de document", link:"/" }
    ]);
  }

  fetchDatas(): void {
    this.loading = true;
    this.studentRequests$ = this.serviceRequestService.getStudentRequests()
  }


  onActionButtonClick(event: any) {
    if(event.actionType === ActionTypes.NAVIGUATE){
      if(event.id !== undefined){
        this.router.navigateByUrl(`${event.action}/${event.id}`);
        return;
      }
     
    }    
  }
}
