import { Component, inject } from '@angular/core';
import { DataGridColumn } from 'src/app/shared/models/data-grid-column.model';
import { Observable, map } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';
import { RequestTreatmentService } from '../../services/request-treatment.service';
import { RequestTreatmentModel } from '../../models/request-treatment.model';
import { StudentService } from 'src/app/users/services/student.service';
import { AuthService } from 'src/app/auth/services/auth.service';


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
  selector: 'app-request-treatment',
  templateUrl: './request-treatment.component.html',
  styleUrls: ['./request-treatment.component.css'],
  animations: [
    trigger('fade', [
      state('hide', style({ opacity: 0 })),
      state('show', style({ opacity: 1 })),
      transition('* <=> *',  animate('0.5s'))
    ])
  ]
})
export class RequestTreatmentComponent {
  // ::Data grid properties
  columns!: DataGridColumn[];
  contextMenuItems = [
    { text: 'Consulter', code: 'CONSULT' },
    { text: 'Télécharger', code:'DOWNLOAD' },
  ];

  // ::properties
  listData$!: Observable<RequestTreatmentModel[]>;
  displayUpdateButton = false;
  studentId!: string
  student!: any; 
  currentUser!: any;

  // ::Service injection
  private RequestTreatmentService = inject(RequestTreatmentService);
  private studentService = inject(StudentService);
  private authService = inject(AuthService);

  // ::Constructor
  constructor(private route: ActivatedRoute,  
    private router: Router, private breadcrumpService: BreadcrumpService){  
      if(this.router.getCurrentNavigation()){
        this.student = this.router.getCurrentNavigation()!.extras!.state;
      }
  }
  
  // ::Methods
  ngOnInit(): void {
    this.currentUser = this.authService.userProfil;
    this.studentId = this.route.snapshot.paramMap.get('id')!
    
    if(this.currentUser.role === 'ADMIN' || this.currentUser.role === 'SUPERADMIN'){
      this.listData$ = this.RequestTreatmentService.getAllRequestTreatmentByStudent(+this.studentId);
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
    
    this.studentService.getStudent(+this.studentId).subscribe(
      (response: any) => {
        this.student = response;
        this.breadcrumpService.setBreadcrump(`Demande de services de ${this.student!.firstName} ${this.student!.lastName}`, [
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

  onContextMenuClick(event: any){
    if(event.code === 'DOWNLOAD'){
      this.RequestTreatmentService.getRequestTreatmentById(event.id).subscribe(
        (response: any) => {
          this.RequestTreatmentService.downloadRequestTreatment(event.id, response.fileName);
        },
        (error: any)=>{
          console.log(error);
        }
      )
    }

    if(event.code === 'CONSULT'){
      this.RequestTreatmentService.getRequestTreatmentById(event.id).subscribe(
        (response:any)=>{
           this.router.navigateByUrl(`/service/request-treatment/${event.id}/consult`, { state: response });
        },
        (error:any)=>{
          console.log(error);
        }
      )
    }
  }

  hasRole(roles: any):boolean{
    return roles.includes(this.currentUser.role)
  }
}
