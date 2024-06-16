import { Component, inject } from '@angular/core';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UsersService } from '../users.service';
import { CollaboraterModel } from '../users.model';
import { ActionTypes, BaseGridPageComponent, DisabledTypes } from 'src/app/shared/pages/base-grid-page.component';

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
    router: Router, private breadcrumpService: BreadcrumpService){  
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
      visibleForRoles: ['SUPERADMIN', 'ADMIN'],
      disabled: false,
      disabledType: DisabledTypes.NONE 
    },
    { 
      label: 'Modifier', 
      icon: 'fas fa-edit', 
      actionType: ActionTypes.NAVIGUATE_WITH_ID_AND_DATA, 
      action: '/user/collaborater/:id/update', 
      action_url: "/v1/collaborater",
      visibleForRoles: ['SUPERADMIN', 'ADMIN'],
      disabled: true,
      disabledType: DisabledTypes.SINGLE
       
    },
    { 
      label: 'Modofier mot de passe', 
      icon: 'fas fa-unlock', 
      actionType: ActionTypes.FUNCTION, 
      action: 'resetPassword', 
      visibleForRoles: ['SUPERADMIN', 'ADMIN'],
      disabled: true,
      disabledType: DisabledTypes.SINGLE 
    },
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

getCollaborater() : any{
  this.userService.getCollaborater(this.selectedRows[0]).subscribe(result=>{
    this.router.navigateByUrl('/users/collaborater/update', { state: result });
  });
}

onUpdateItem(){
  if(this.selectedRows.length){
    this.userService.getCollaborater(this.selectedRows[0]).subscribe(result=>{
      this.router.navigateByUrl('/users/collaborater/update', { state: result });
    });
  }
}



resetPassword(id: any){
  if(this.selectedRows.length){
    this.userService.ResetPasswordCollaborater({id:id}).subscribe({
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
