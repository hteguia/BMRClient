import { Component, inject } from '@angular/core';
import { LogService } from 'src/app/core/services/log.service';
import { UserService } from 'src/app/core/services/user.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';

export interface DataGridButtonAction
{
    label: string;
    icon: string;
    actionType: string;
    action: string | Function;
    action_url?: string;
    visibleForRoles: Array<string>;
    disabledType: DisabledTypes;
    disabled: boolean;
}

export class DataGridColumn
{
    dataField!: string;
    caption!: string;
    dataType!: string;
    visible?: boolean = true;
    template?: '' | 'statusTemplate' | 'amountTemplate' | 'dateTemplate' = ''; 
    calculateCellValue?:  '' | 'concatValue' = ''
    alignment?: 'center' | 'left' | 'right' = 'left';
    width?: number = 100;
}

export enum DisabledTypes{
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
  NONE = 'NONE'
}

export enum ActionTypes{
  NAVIGUATE = 'NAVIGUATE',
  NAVIGUATE_WITH_ID = 'NAVIGUATE_WITH_ID',
  NAVIGUATE_WITH_ID_URL = 'NAVIGUATE_WITH_ID_URL',
  NAVIGUATE_WITH_ID_AND_DATA = 'NAVIGUATE_WITH_ID_AND_DATA',
  FUNCTION = 'FUNCTION',
  API = 'API'
}

@Component({
  selector: 'app-base-grid-page',
  template: `<div></div>`,
  styles: [``],
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

  constructor(protected router: Router, protected route: ActivatedRoute){}
  
  private uerService = inject(UserService);
  private logService = inject(LogService);
  private authService = inject(AuthService);
  protected dialog = inject(MatDialog);
  private http = inject(HttpClient);

  currentUser!:any;
  id!: string;

  loading = false;
  selectedRows = [];
  contextMenuItems!: Array<any>;
  columns!: Array<DataGridColumn>;
  buttonActions!: Array<DataGridButtonAction>;
  displaySingleCheck = false;
  displayMutipleCheck = false;

  ngOnInit(): void {
    this.currentUser = this.authService.userProfil;
    this.id = this.route.snapshot.paramMap.get('id')!
  }

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

  onActionButtonClick(event: any) {
    if(event.actionType === ActionTypes.NAVIGUATE){
      this.router.navigateByUrl(`${event.action}`);  
      return;   
    }    

    if(event.actionType === ActionTypes.NAVIGUATE_WITH_ID){
      if(event.id !== undefined){
        this.router.navigateByUrl(event.action.replace(':id', event.id));
        return;
      }
    }

    if(event.actionType === ActionTypes.NAVIGUATE_WITH_ID_URL){
      if(event.id !== undefined){
        this.router.navigateByUrl(event.action.replace(':id', this.id));
        return;
      }
    }

    if(event.actionType === ActionTypes.NAVIGUATE_WITH_ID_AND_DATA){
      const url = event.action.replace(':id', event.id);
      this.http.get(`${environment.apiUrl}${event.action_url}/${event.id}`).subscribe((response: any) => {
        this.router.navigateByUrl(url, { state: response });
      });
    }

    if(event.actionType === ActionTypes.FUNCTION){
      (this as any)[event.action](event.id);
      //event.action(event.id);
    }

    if(event.actionType === ActionTypes.API){
      this.loading = true;
      event.action().subscribe((response: any) => {
        this.loading = false;
      }, (error: any) => {
        this.loading = false;
        this.logService.error(error);
      });
    }
  }

 
}
