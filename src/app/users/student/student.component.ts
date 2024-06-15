import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActionTypes, BaseGridPageComponent, DisabledTypes } from 'src/app/shared/pages/base-grid-page/base-grid-page.component';
import { UsersService } from '../users.service';
import { StudentModel } from '../users.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
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
export class StudentComponent extends BaseGridPageComponent{
  
  private userService = inject(UsersService);
  
  student$!: Observable<StudentModel[]>;

  constructor(route: ActivatedRoute,  
    router: Router, private breadcrumpService: BreadcrumpService){  
      super(router, route);
  }

override ngOnInit(): void {
  this.columns = [
    { dataField: "lastName",caption:"Noms", dataType:"string", visible:true },
    { dataField: "firstName",caption:"Prénoms", dataType:"string", visible:true },
    { dataField: "email",caption:"Email", dataType:"string", visible:true },
    { dataField: "faculty",caption:"Faculté", dataType:"string", visible:true },
    { dataField: "category",caption:"Catégorie", dataType:"string", visible:true },
    { dataField: "partner",caption:"Partenaire", dataType:"string", visible:true },
  ];

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
 

  this.breadcrumpService.setBreadcrump("Liste des étudiants", [
    { title:"Utilisateurs", link:"/" }, 
    { title:"Etudiants", link:"/" }
  ]);

  this.fetchDatas();
  }


  fetchDatas(): void {
    this.loading = true;
    this.student$ = this.userService.getAllStudent()
  }

}
