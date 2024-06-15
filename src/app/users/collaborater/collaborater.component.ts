import { Component, inject } from '@angular/core';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CollaboraterService } from 'src/app/users/services/collaborater.service';
import { ActionTypes, BaseGridPageComponent, DisabledTypes } from 'src/app/shared/pages/base-grid-page/base-grid-page.component';
import { UsersService } from '../users.service';
import { CollaboraterModel } from '../users.model';

@Component({
  selector: 'app-collaborater',
  templateUrl: './collaborater.component.html',
  styleUrls: ['./collaborater.component.css'],
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
export class CollaboraterComponent extends BaseGridPageComponent{
 
  private userService = inject(UsersService);
  
  displayUpdateButton = false;

  showFilterModel = false;

  collaborater$!: Observable<CollaboraterModel[]>;



  constructor(route: ActivatedRoute,  
    router: Router, private breadcrumpService: BreadcrumpService,
    private collaboraterService: CollaboraterService){  
      super(router, route);
  }

override ngOnInit(): void {
  this.columns = [
    { dataField: "lastName",caption:"Noms", dataType:"string" },
    { dataField: "firstName",caption:"Prénoms", dataType:"string" },
    { dataField: "phoneNumber",caption:"Téléphone", dataType:"string",  width:200 },
    { dataField: "email",caption:"Email", dataType:"string", },
    { dataField: "role",caption:"Rôle", dataType:"string",  width:150 },
    { dataField: "serviceRequestNotify",caption:"Notification par SMS", dataType:"string",  width:175, template:"statusTemplate", alignment:'center' },
  ]

  this.buttonActions = [
    { 
      label: 'Ajouter', 
      icon: 'fas fa-plus', 
      actionType: ActionTypes.NAVIGUATE, 
      action: '/user/collaborater/add', 
      visibleForRoles: ['SUPERADMIN', 'ADMIN', 'BASIC'],
      disabled: false,
      disabledType: DisabledTypes.NONE 
    },
    { 
      label: 'Modifier', 
      icon: 'fas fa-edit', 
      actionType: ActionTypes.NAVIGUATE, 
      action: '/user/collaborater/:id/update', 
      visibleForRoles: ['SUPERADMIN', 'ADMIN', 'BASIC'],
      disabled: true,
      disabledType: DisabledTypes.SINGLE
       
    }
  ];  

  this.breadcrumpService.setBreadcrump("Liste des collaborateurs", [
    { title:"Utilisateurs", link:"/" }, 
    { title:"Collaborateurs", link:"/" }
  ]);

  this.fetchDatas();
}

onFilterDataGrid(){
  this.showFilterModel = !this.showFilterModel;
}
  
onAddNewItem(){
  this.router.navigateByUrl('/users/collaborater/add');
}

onUpdateItem(){
  if(this.selectedRows.length){
    this.collaboraterService.getCollaborater(this.selectedRows[0]).subscribe(result=>{
      this.router.navigateByUrl('/users/collaborater/update', { state: result });
    });
  }
}



resetPassword(){
  if(this.selectedRows.length){
    this.collaboraterService.ResetPasswordCollaborater({id:this.selectedRows[0]}).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
}

 fetchDatas(): void {
    this.loading = true;
    this.collaborater$ = this.userService.getAllCollaborater()
  }
}
