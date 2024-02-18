import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';
import { DataGridColumn } from 'src/app/shared/models/data-grid-column.model';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PartnerModel } from 'src/app/users/models/partner.model';
import { PartnerService } from 'src/app/users/services/partner.service';
import { AddPartnerComponent } from '../add-partner/add-partner.component';


@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css'],
  animations: [
    trigger('fade', [
      state('hide', style({
        opacity: 0,
      })),
      state('show', style({
        opacity: 1,
      })),
      transition('hide <=> show', [
        animate('0.5s')
      ])
    ])
  ]
})
export class PartnerComponent {
  columns: DataGridColumn[] = [
    { dataField: "name",caption:"Libelle", dataType:"string", visible:true },
    { dataField: "numberOfStudents",caption:"Nombre d'étudiants", dataType:"string", visible:true },
  ];
  selectedRows = [];
  showFilterModel = false;
  displayUpdateButton = false;

  topups$!: Observable<PartnerModel[]>;

  constructor(private route: ActivatedRoute, private router: Router, private breadcrumpService: BreadcrumpService,
    public dialog: MatDialog, private partnerService: PartnerService) {  

  }

  ngOnInit(): void {
    this.topups$ = this.route.data.pipe(
      map(data => data['data'])
    );  

  this.breadcrumpService.setBreadcrump("Liste des partenaires", [
      { title:"Utilisateurs", link:"/" }, 
      { title:"Partenaire", link:"/" }
    ]);
  }

  onFilterDataGrid(){
    this.showFilterModel = !this.showFilterModel;
  }

  onAddPartner(){
    this.openPartnerForm('Nouveau partenaire');
  }

  onUpdatePartner(){
    console.log(this.selectedRows)
    if(this.selectedRows.length){
      console.log(this.selectedRows[0]);
      this.partnerService.getPartner(this.selectedRows[0]).subscribe(result=>{
        this.openPartnerForm('Modifier le partenaire', result)
      });
    }
  }

  private openPartnerForm(title:string, partnerModel?: PartnerModel){
    const dialogRef = this.dialog.open(AddPartnerComponent, {
      data: 
      {
        data: partnerModel, 
        title:title
      }, 
      minWidth: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === "RELOAD_GRID"){
        this.topups$ = this.partnerService.getAllPartner();
      }
    });
  }

  onRowClick(event: any){
 
  }

  onSelectRow(rows: []){
    this.selectedRows = rows;
    this.displayUpdateButton = +rows.length === 1;
  }
}
