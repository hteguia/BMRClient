import { Component, OnInit } from '@angular/core';
import { ServiceRequest } from '../../models/service-request.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceRequestsService } from '../../services/service-requests.service';
import { Observable, map } from 'rxjs';
import { DatePipe } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { DataGridColumn } from 'src/app/shared/models/data-grid-column.model';

@Component({
  selector: 'app-service-request-list',
  templateUrl: './service-request-list.component.html',
  styleUrls: ['./service-request-list.component.css'],
  animations: [
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        'background-color': 'white',
        'z-index': 1
      })),
      transition('void => *',
      [
        style({
          opacity: 0,
        }),
        animate('400ms ease-in', style({ opacity: 1 })),
      ]),
      transition('default => void',
      [
        style({
          opacity: 1
        }),
        animate('300ms ease-out', style({ opacity: 0 })),
      ])
    ]),
    trigger('gridFilter', [
      state('default', style({
        transform: 'scale(1)',
        'background-color': 'white',
        'z-index': 1
      })),
      transition('void => *',
      [
        style({
          transform: 'translateY(-20%)',
          opacity: 0,
          'background-color': 'rgb(201, 157, 242)',
          'z-index': 1
        }),
        animate('300ms ease-out', style({
          transform: 'translateY(0)',
          opacity: 1,
          'background-color': 'white',
          'z-index': 1
        }))
      ]),
      transition('default => void',
      [
        style({
          transform: 'translateY(0)',
          opacity: 1,
          'background-color': 'rgb(201, 157, 242)',
          'z-index': 1
        }),
        animate('300ms ease-out', style({
          transform: 'translateY(-20%)',
          opacity: 0,
          'background-color': 'white',
          'z-index': 1
        }))
      ])
    ])
  ],
})
export class ServiceRequestListComponent implements OnInit {
  
  columns: DataGridColumn[] = [
    { dataField: "createAt",caption:"Date de la demande", dataType:"date", visible:true },
    { dataField: "serviceType",caption:"Type de service", dataType:"string", visible:true },
    { dataField: "returnDeadline",caption:"Delai de traitement", dataType:"string", visible:true },
    { dataField: "amount",caption:"Montant", dataType:"string", template:'amountTemplate', visible:true },
    { dataField: "status",caption:"Status de la demande", dataType:"string", template:'statusTemplate', visible:true}
  ];

  selectedRows = [];
  listItemAnimateState = 'default';

  showFilterModel = false;

  customers!: Observable<ServiceRequest[]>;

  serviceTypes = ['png', 'pdf']

  constructor(private route: ActivatedRoute, 
              private serviceRequestsService: ServiceRequestsService,  
              private router: Router, 
              private datepipe: DatePipe){  
  }

  ngOnInit(): void {
    this.customers = this.route.data.pipe(
      map(data => data['serviceResquests'])
    );   
  }

  onAddNewServiceRequest(){
    this.router.navigateByUrl('/service-request/add-service-request');
  }

  dateColumnCustomizeText(cellInfo: { value: any; }) {
    return this.datepipe.transform(cellInfo.value, 'yyyy-MM-dd');
  }

  onSelectRow(rows: []){
    this.selectedRows = rows;
  }

  onFilterDataGrid(){
    this.showFilterModel = !this.showFilterModel;
  }

  onRowClick(event: any){
    console.log("ok");
    this.router.navigateByUrl(`service-request/consult/${event.id}`);
  }
}
