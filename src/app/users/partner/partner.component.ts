import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';
import { MatDialog } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PartnerService } from 'src/app/users/services/partner.service';
import { AddPartnerComponent } from '../partner-add/add-partner.component';
import { ActionTypes, BaseGridPageComponent, DisabledTypes } from 'src/app/shared/pages/base-grid-page/base-grid-page.component';
import { UsersService } from '../users.service';
import { PartnerModel } from '../users.model';


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

  constructor(route: ActivatedRoute, router: Router, private breadcrumpService: BreadcrumpService,
    public dialog: MatDialog, private partnerService: PartnerService) {  
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
        actionType: ActionTypes.NAVIGUATE, 
        action: '/user/student/add', 
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
        this.partner$ = this.partnerService.getAllPartner();
      }
    });
  }

  fetchDatas(): void {
    this.loading = true;
    this.partner$ = this.userService.getAllPartner()
  }
}
