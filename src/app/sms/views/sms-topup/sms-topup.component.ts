import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataGridColumn } from 'src/app/shared/models/data-grid-column.model';
import { Topup } from '../../models/topup.model';

@Component({
  selector: 'app-sms-topup',
  templateUrl: './sms-topup.component.html',
  styleUrls: ['./sms-topup.component.css'],
  animations:[
    trigger('gridFilter', [
      transition('void => *',
      [
        style({
          transform: 'scale(1)',
          'background-color': 'white',
          'z-index': 1
        }),
        animate('300ms ease-out', style({
          transform: 'translateY(-20)',
          opacity: 1,
          'background-color': 'white',
          'z-index': 1
        }))
      ]),
      transition('* => void',
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
  ]
})
export class SmsTopupComponent {
  columns: DataGridColumn[] = [
    { dataField: "createdAt",caption:"Date", dataType:"date", template:'dateTemplate', visible:true },
    { dataField: "amount",caption:"Montant de la recharge", dataType:"string",template:'amountTemplate', visible:true },
    { dataField: "meanOfPaid",caption:"Moyen de paiement", dataType:"string", visible:true },
    { dataField: "status",caption:"Status", dataType:"string", template:'statusTemplate', visible:true }
  ];
  selectedRows = [];
  listItemAnimateState = 'default';

  showFilterModel = false;

  topups$!: Observable<Topup[]>;

  constructor(private route: ActivatedRoute,  
    private router: Router){  
}

ngOnInit(): void {
  this.topups$ = this.route.data.pipe(
    map(data => data['topups'])
  );  
}

onFilterDataGrid(){
  this.showFilterModel = !this.showFilterModel;
}

onAddNewCustomer(){
  this.router.navigateByUrl('/sms/add-topup');
}

onRowClick(event: any){
 
}

onSelectRow(rows: []){
  this.selectedRows = rows;
}
}
