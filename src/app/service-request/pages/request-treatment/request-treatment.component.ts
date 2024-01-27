import { Component, inject } from '@angular/core';
import { DataGridColumn } from 'src/app/shared/models/data-grid-column.model';
import { DocumentTypeModel } from '../../models/document-type.model';
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
      state('hide', style({
        opacity: 0,
      })),
      state('show', style({
        opacity: 1,
      })),
      transition('hide => show', [
        animate('0.5s')
      ]),
      transition('show => hide', [
        animate('0.5s')
      ])
    ])
  ]
})
export class RequestTreatmentComponent {
  columns: DataGridColumn[] = [
    { dataField: "createAt",caption:"Date de demande", dataType:"date", template:'dateTemplate', visible:true },
    { dataField: "serviceType",caption:"Type de service", dataType:"string", visible:true },
    { dataField: "deadline",caption:"Delai de traitement souhaité", dataType:"string", visible:true },
    { dataField: "treatmentStatus",caption:"Statut du traitement", dataType:"string", template:'statusTemplate', visible:true },
    { dataField: "paymentStatus",caption:"Status du paiement", dataType:"string", template:'statusTemplate', visible:true }
  ];
  selectedRows = [];
  listItemAnimateState = 'default';
  displayUpdateButton = false;

  constructor(private route: ActivatedRoute,  
    private router: Router, private breadcrumpService: BreadcrumpService){  
  }

  private RrquestTreatmentService = inject(RequestTreatmentService);

  showFilterModel = false;
  listData$!: Observable<RequestTreatmentModel[]>;
  id!: string

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!
    this.listData$ = this.RrquestTreatmentService.getAllRequestTreatmentByStudent(+this.id);
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
    this.router.navigateByUrl(`/service-request/student/${this.id}/request-treatment/add`);
  }

  onUpdateItem(){
    
  }
}
