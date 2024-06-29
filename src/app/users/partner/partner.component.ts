import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AddPartnerComponent } from '../partner-add/add-partner.component';
import { UsersService } from '../users.service';
import { PartnerModel } from '../users.model';
import { ActionTypes, BaseGridPageComponent, DisabledTypes } from 'src/app/shared/pages/base-grid-page.component';


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
export class PartnerComponent extends BaseGridPageComponent {
 
  private userService = inject(UsersService);
  
  showFilterModel = false;
  displayUpdateButton = false;

  partner$!: Observable<PartnerModel[]>;

  constructor(route: ActivatedRoute, router: Router, private breadcrumpService: BreadcrumpService) {  
      super(router, route);
  }

  override ngOnInit(): void {
    this.columns = [
      { dataField: "name",caption:"Libelle", dataType:"string", visible:true },
      { dataField: "numberOfStudents",caption:"Nombre d'étudiants", dataType:"string", visible:true },
    ]

    this.buttonActions = [
      { 
        label: 'Ajouter', 
        icon: 'fas fa-plus', 
        actionType: ActionTypes.FUNCTION, 
        action: 'addPartner', 
        visibleForRoles: ['SUPERADMIN', 'ADMIN', 'BASIC'],
        disabled: false,
        disabledType: DisabledTypes.NONE 
      }
    ];

    this.breadcrumpService.setBreadcrump("Liste des partenaires", [
        { title:"Utilisateurs", link:"/" }, 
        { title:"Partenaire", link:"/" }
      ]);

    this.fetchDatas();
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
      this.userService.getPartner(this.selectedRows[0]).subscribe(result=>{
        this.openPartnerForm('Modifier le partenaire', result)
      });
    }
  }

  addPartner(id:any){
    const dialogRef = this.dialog.open(AddPartnerComponent, {
      data: 
      {
        data: null, 
        title:'Nouveau partenaire'
      }, 
      minWidth: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === "RELOAD_GRID"){
        this.partner$ = this.userService.getAllPartner();
      }
    });
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
        this.partner$ = this.userService.getAllPartner();
      }
    });
  }

  fetchDatas(): void {
    this.loading = true;
    this.partner$ = this.userService.getAllPartner()
  }
}
