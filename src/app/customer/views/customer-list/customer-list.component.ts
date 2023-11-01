import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataGridColumn } from 'src/app/shared/models/data-grid-column.model';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {

  columns: DataGridColumn[] = [
    { dataField: "name",caption:"Name", dataType:"string", visible:true },
    { dataField: "phoneNumber",caption:"Téléphone", dataType:"string", visible:true },
    { dataField: "email",caption:"Email", dataType:"string", visible:true },
    { dataField: "webSite",caption:"Site Web", dataType:"string", visible:true }
  ];
  selectedRows = [];
  listItemAnimateState = 'default';

  showFilterModel = false;

  customers!: Observable<Customer[]>;

  constructor(private route: ActivatedRoute,  
    private router: Router, 
    private authService: AuthService,
    private store: Store){  
}

ngOnInit(): void {
  

  this.customers = this.route.data.pipe(
    map(data => data['customers'])
  );   
}

onFilterDataGrid(){
  this.showFilterModel = !this.showFilterModel;
}

onAddNewCustomer(){
  this.router.navigateByUrl('/customers/add');
}

onRowClick(event: any){
  this.router.navigateByUrl(`service-request/consult/${event.id}`);
}

onSelectRow(rows: []){
  this.selectedRows = rows;
}
}
