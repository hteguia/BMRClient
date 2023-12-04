import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataGridColumn } from 'src/app/shared/models/data-grid-column.model';
import { Topup } from '../../models/topup.model';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';

@Component({
  selector: 'app-sms-topup',
  templateUrl: './sms-topup.component.html',
  styleUrls: ['./sms-topup.component.css']
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
    private router: Router, private breadcrumpService: BreadcrumpService){  
}

ngOnInit(): void {
  this.topups$ = this.route.data.pipe(
    map(data => data['topups'])
  );  

  this.breadcrumpService.setBreadcrump("Liste des recharges", [
    { title:"Home", link:"/" }, 
    { title:"Recharge", link:"/" }
  ]);
}

onFilterDataGrid(){
  this.showFilterModel = !this.showFilterModel;
}

onAddNewCustomer(){
  this.router.navigateByUrl('/sms/topup/add');
}

onRowClick(event: any){
 
}

onSelectRow(rows: []){
  this.selectedRows = rows;
}
}
