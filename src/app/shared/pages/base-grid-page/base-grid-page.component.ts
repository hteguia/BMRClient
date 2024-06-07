import { Component, inject } from '@angular/core';
import { LogService } from 'src/app/core/services/log.service';
import { UserService } from 'src/app/core/services/user.service';
import { DataGridColumn } from '../../models/data-grid-column.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

export interface DataGridButtonAction
{
    label: string;
    icon: string;
    actionType: string;
    action: string;
    visibleForRoles: Array<string>;
    disabledType: DisabledTypes;
    disabled: boolean;
}

export enum DisabledTypes{
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
  NONE = 'NONE'
}

export enum ActionTypes{
  NAVIGUATE = 'NAVIGUATE',
  FUNCTION = 'FUNCTION',
  API = 'API'
}

@Component({
  selector: 'app-base-grid-page',
  templateUrl: './base-grid-page.component.html',
  styleUrls: ['./base-grid-page.component.css'],
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
export class BaseGridPageComponent {
  private uerService = inject(UserService);
  private logService = inject(LogService);

  loading = false;
  selectedRows = [];
  contextMenuItems!: Array<any>;
  columns!: Array<DataGridColumn>;
  buttonActions!: Array<DataGridButtonAction>;
  displaySingleCheck = false;
  displayMutipleCheck = false;

  onSelectRow(rows: []){
    this.selectedRows = rows;
    this.displaySingleCheck = +rows.length === 1;
    this.displayMutipleCheck = +rows.length === 1;
  }

  onRowClick(event: any){
 
  }

  hasRole(roles: any):boolean{
    return roles.includes(this.uerService.role)
  }

 
}
