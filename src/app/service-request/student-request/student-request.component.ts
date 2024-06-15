import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { DataGridColumn } from 'src/app/shared/models/data-grid-column.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';
import { ActionTypes, BaseGridPageComponent, DisabledTypes } from 'src/app/shared/pages/base-grid-page/base-grid-page.component';
import { ServiceRequestService } from '../service.request.service';
import { RequestTreatmentDetail } from '../service-request.model';
import { UsersService } from 'src/app/users/users.service';

export const COLUMN_ADMIN: DataGridColumn[] = [
  { dataField: "createAt",caption:"Date de demande", dataType:"date", template:'dateTemplate', width: 160},
  { dataField: "serviceType",caption:"Type de service", dataType:"string" },
  { dataField: "deadline",caption:"Delai de traitement", dataType:"string" },
  { dataField: "treatmentStatus",caption:"Statut du traitement", dataType:"string", template:'statusTemplate', alignment:'center', width: 175 }
];

export const COLUMN_STUDENT: DataGridColumn[] = [
  { dataField: "createAt",caption:"Date de demande", dataType:"date", template:'dateTemplate', width: 160},
  { dataField: "serviceType",caption:"Type de service", dataType:"string" },
  { dataField: "deadline",caption:"Delai de traitement", dataType:"string" },
  { dataField: "treatmentStatus",caption:"Statut du traitement", dataType:"string", template:'statusTemplate', alignment:'center', width: 175 }
];

export const COLUMN_MODERATOR: DataGridColumn[] = [
  { dataField: "createAt",caption:"Date de demande", dataType:"date", template:'dateTemplate', width: 160},
  { dataField: "studentName",caption:"Etudiant", dataType:"string" },
  { dataField: "serviceType",caption:"Type de service", dataType:"string" },
  { dataField: "deadline",caption:"Delai de traitement", dataType:"string" },
  { dataField: "treatmentStatus",caption:"Statut du traitement", dataType:"string", template:'statusTemplate', alignment:'center', width: 175 }
];

@Component({
  selector: 'app-student-request',
  templateUrl: './student-request.component.html',
  styleUrls: ['./student-request.component.css']
})
export class StudentRequestComponent extends BaseGridPageComponent{
  
   listData$!: Observable<RequestTreatmentDetail[]>;
   studentId!: string
   student!: any; 

   private serviceRequestService = inject(ServiceRequestService);
   private usersService = inject(UsersService);

   constructor(route: ActivatedRoute,  
     router: Router, private breadcrumpService: BreadcrumpService){  
      super(router, route);
       if(this.router.getCurrentNavigation()){
         this.student = this.router.getCurrentNavigation()!.extras!.state;
       } 
   }
   
   override ngOnInit(): void {
    super.ngOnInit();
    this.columns = COLUMN_ADMIN;
    this.studentId = this.route.snapshot.paramMap.get('id')!

    this.buttonActions = [
      { 
        label: 'Ajouter', 
        icon: 'fas fa-plus', 
        actionType: ActionTypes.NAVIGUATE_WITH_ID_URL, 
        action: `/service-request/student/${this.studentId}/request-treatment/add`, 
        visibleForRoles: ['SUPERADMIN', 'ADMIN', 'BASIC'],
        disabled: false,
        disabledType: DisabledTypes.NONE
      },
      { 
        label: 'Consulter', 
        icon: 'far fa-eye', 
        actionType: ActionTypes.NAVIGUATE_WITH_ID, 
        action: `/service-request/student/${this.studentId}/request-treatment/:id/consult`, 
        visibleForRoles: ['SUPERADMIN', 'ADMIN', 'BASIC'],
        disabled: true,
        disabledType: DisabledTypes.SINGLE
      }
    ];
    
     
     
     if(this.currentUser.role === 'ADMIN' || this.currentUser.role === 'SUPERADMIN'){
       this.listData$ = this.serviceRequestService.getRequestTreatmentsByStudent(+this.studentId);
       this.columns = COLUMN_ADMIN;
     }
 
     if(this.currentUser.role === 'MODERATOR'){
       this.listData$ = this.route.data.pipe(
         map(data => data['data'])
       ); 
       this.columns = COLUMN_MODERATOR;
     }
     if(this.currentUser.role === 'BASIC'){
       this.listData$ = this.route.data.pipe(
         map(data => data['data'])
       ); 
       this.columns = COLUMN_STUDENT;
     }
     
     this.usersService.getStudent(+this.studentId).subscribe(
       (response: any) => {
         this.student = response;
         this.breadcrumpService.setBreadcrump(`${this.student!.firstName} ${this.student!.lastName} // Demande de services de`, [
           { title:"Demande de service", link:"/" },
           { title:"Demande des étudiants", link:"/" }
         ]);
       }
     )
   }
 
   onAddNewItem(){
     const id = this.currentUser.role === 'ADMIN' || this.currentUser.role === 'SUPERADMIN' ? this.studentId : this.currentUser.id;
     this.router.navigateByUrl(`/service/request-treatment/student/${id}/add`);
   }
}
