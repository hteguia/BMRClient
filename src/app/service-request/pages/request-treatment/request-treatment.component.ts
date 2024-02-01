import { Component, inject } from '@angular/core';
import { DataGridColumn } from 'src/app/shared/models/data-grid-column.model';
import { Observable } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';
import { RequestTreatmentService } from '../../services/request-treatment.service';
import { RequestTreatmentModel } from '../../models/request-treatment.model';

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
  columns: DataGridColumn[] = [
    { dataField: "createAt",caption:"Date de demande", dataType:"date", template:'dateTemplate'},
    { dataField: "serviceType",caption:"Type de service", dataType:"string" },
    { dataField: "deadline",caption:"Delai de traitement souhaité", dataType:"string" },
    { dataField: "treatmentStatus",caption:"Statut du traitement", dataType:"string", template:'statusTemplate', alignment:'center' },
    { dataField: "paymentStatus",caption:"Status du paiement", dataType:"string", template:'statusTemplate', alignment:'center' }
  ];
  contextMenuItems = [
    { text: 'Consulter', code: 'CONSULT' },
    { text: 'Télécharger', code:'DOWNLOAD' },
  ];
  selectedRows = [];

  // ::properties
  listData$!: Observable<RequestTreatmentModel[]>;
  listItemAnimateState = 'default';
  displayUpdateButton = false;
  showFilterModel = false;
  studentId!: string

  // ::Service injection
  private RrquestTreatmentService = inject(RequestTreatmentService);

  // ::Constructor
  constructor(private route: ActivatedRoute,  
    private router: Router, private breadcrumpService: BreadcrumpService){  
  }

  // ::Methods
  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id')!
    this.listData$ = this.RrquestTreatmentService.getAllRequestTreatmentByStudent(+this.studentId);
    this.breadcrumpService.setBreadcrump("Liste des demande de services", [
      { title:"Demande de service", link:"/" }, 
      { title:"Demande de service", link:"/" }
    ]);
  }

  onRowClick(event: any){
 
  }
  
  onSelectRow(rows: []){
    this.selectedRows = rows;
  }

  onFilterDataGrid(){
    this.showFilterModel = !this.showFilterModel;
  }
    
  onAddNewItem(){
    this.router.navigateByUrl(`/service-request/student/${this.studentId}/request-treatment/add`);
  }

  onUpdateItem(){
    
  }

  onContextMenuClick(event: any){
    
  }
}
