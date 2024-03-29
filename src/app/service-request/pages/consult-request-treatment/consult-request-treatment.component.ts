import { Component, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RequestTreatmentService } from '../../services/request-treatment.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RequestTreatmentDetailComponent } from '../../components/request-treatment-detail/request-treatment-detail.component';
import { RequestTreatmentResultComponent } from '../../components/request-treatment-result/request-treatment-result.component';
import { RequestTreatmentStatusComponent } from '../../components/request-treatment-status/request-treatment-status.component';
import { LogService } from 'src/app/core/services/log.service';
import { merge } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-consult-request-treatment',
  templateUrl: './consult-request-treatment.component.html',
  styleUrls: ['./consult-request-treatment.component.css'],
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
export class ConsultRequestTreatmentComponent {

  @ViewChild("detailView") detailView!: RequestTreatmentDetailComponent;
  @ViewChild("resultView") resultView!: RequestTreatmentResultComponent;
  @ViewChild("statusView") statusView!: RequestTreatmentStatusComponent;

  private requestTreatmentService = inject(RequestTreatmentService);
  private logService = inject(LogService);
  private authService = inject(AuthService);
  requestTreatment!:any;
  id!: any;
  titleStatus = "Veuillez cocher les étapes, durant la phase de correction et enregistrer";
  slectedStatus: string = '';

  displayUpdateButton = false;
  disabledSaveButton = true;

  currentUser!:any;

  constructor(private router: Router)
  {
    if(this.router.getCurrentNavigation()){
      this.requestTreatment = this.router.getCurrentNavigation()!.extras!.state;
    }
  }

  ngOnInit(): void {
    this.currentUser = this.authService.userProfil;
  }
  
  private getRequestTreatmentDetail(id: any){
    this.requestTreatmentService.getRequestTreatmentById(id).subscribe({
      next: (response: any) => {
        console.log('end get status');
        this.requestTreatment = response;
      },
      error: (error: any) => {
        this.logService.log(error);
      }
    });
  }

  saveAllChange(event: any){
    if(!this.statusView.valid || !this.resultView.valid){
      return;
    }
    
    let ob = []
    if(this.statusView.updated){
      ob.push(this.statusView.saveChange());
    }

    if(this.resultView.updated){
      ob.push(this.resultView.saveChange());
    }
    merge(...ob)
    .subscribe({
      next: (response: any) => {
        this.getRequestTreatmentDetail(this.requestTreatment.id);
        this.statusView.reload();
        this.resultView.reload();
        this.statusView.updated = false;
        this.resultView.updated = false;
      },
      error: (error: any) => {
        this.logService.log(error);
      }
    });
    this.disabledSaveButton = true;
  }

  hasRole(roles: any):boolean{
    return roles.includes(this.currentUser.role)
  }
}
