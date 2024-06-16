import { Component, inject } from '@angular/core';
import { Observable, forkJoin, merge, startWith, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BasePageComponent } from 'src/app/shared/pages/base-page.component';
import { ServiceRequestService } from '../service.request.service';
import { StatusEnum } from 'src/app/core/enums/status.enum';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-student-request-consult',
  templateUrl: './student-request-consult.component.html',
  styleUrls: ['./student-request-consult.component.css']
})
export class StudentRequestConsultComponent extends BasePageComponent {

  id!: any;

  #serviceRequestService = inject(ServiceRequestService);
  
  requestTreatment$!: Observable<any>;
  requestTreatmentStatus$!: Observable<any>
  requestTreatmentResult$!: Observable<any>;
  monitors$!: Observable<any>;

  requestTreatment!: any;
  requestTreatmentStatus!: any;
  requestTreatmentResult!: any;
  monitors!: any;
  fileToAdd: any[] = [];
  disabledSaveButton = true;

  monitorCtrl!: FormControl;
  fileCtrl!: FormControl;
  statusCtrl!: FormControl;

  req:{[key: string]:any} = {}
  

  constructor(router: Router, route: ActivatedRoute) 
  { 
    super(router, route) 
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.id = this.route.snapshot.paramMap.get('id');

    this.requestTreatment$ = this.#serviceRequestService.getRequestTreatmentById(this.id);
    this.requestTreatmentStatus$ = this.#serviceRequestService.getRequestTreatmentStatus(this.id);
    this.requestTreatmentResult$ = this.#serviceRequestService.getRequestTreatmentResult(this.id);
    this.monitors$ = this.#serviceRequestService.getAllCollaborater();

    this.monitorCtrl = new FormControl('');
    this.statusCtrl = new FormControl('');
    this.fileCtrl = new FormControl('');


    this.fetchDatas();

    this.monitorCtrl.valueChanges.pipe(
      startWith(''),
      tap((val:any)=>{
        if(this.monitorCtrl.value != undefined && +this.monitorCtrl.value != 0){
          this.disabledSaveButton = false;
        }
      })
    ).subscribe();

    
    this.fileCtrl.valueChanges.pipe().subscribe((file: any) => {this.onUploadFinished(file)});

    

    if(this.currentUser.role === 'MODERATOR'){
      this.monitorCtrl.disable()
    }
  }

  private fetchDatas(){
    forkJoin({
      requestTreatment: this.requestTreatment$, 
      requestTreatmentStatus: this.requestTreatmentStatus$, 
      requestTreatmentResult: this.requestTreatmentResult$,
      monitors: this.monitors$
    })
    .subscribe({
      next: (response: any) => {
        this.requestTreatment = response.requestTreatment;
        this.requestTreatmentStatus = this.updateStatus(response.requestTreatmentStatus);
        this.requestTreatmentResult = response.requestTreatmentResult;
        this.monitors = response.monitors;
       
        if(this.requestTreatment.collaboraterId){
          this.monitorCtrl.setValue(this.requestTreatment.collaboraterId);
        }

        if(this.requestTreatment.treatmentStatus === StatusEnum.TRAITEMENT_TERMINE){
          this.monitorCtrl.disable();
        }
      },
      error: (error: any) => {
        this.logService.error(error);
      }   
    })
  }

  downloadRequestTreatment(event:any){
    this.#serviceRequestService.downloadRequestTreatment(this.id);
  }

  private updateStatus(response: any) : any {
    let statusList = [
      { value: StatusEnum.INITIATE, date:'', checked:false, disabled: false},
      { value: StatusEnum.EN_ATTENTE_TRAITEMENT,  date:'', checked:false, disabled: false },
      { value: StatusEnum.TRAITEMENT_ENCOURS,  date:'', checked:false, disabled: false },
      { value: StatusEnum.TRAITEMENT_TERMINE,  date:'', checked:false, disabled: false },
    ];

    statusList.forEach((element: any, index: number) => {
      if(response.find((el: any)=> el.status === element.value)){
        element.date = response.find((el: any)=> el.status === element.value).createAt;
        element.checked = true;
        element.disabled = true;
      }
      else{
        element.disabled = index === 0 || statusList[index-1].date === '' || this.currentUser.role === 'BASIC';
      }
     });

     return statusList
  }

  onCheckStatusChange(event: any){
    this.statusCtrl.setValue(event.val ? event.code : '');
    if(this.requestTreatment.treatmentStatus !== StatusEnum.TRAITEMENT_TERMINE){
      this.monitorCtrl.disable();
    }
  }

  onUploadFinished(event: any){
    if(event.id !== null && event.id !== undefined){
      this.fileToAdd.push({id:event.id, fileName:event.fileName});
      this.requestTreatmentResult.push({id: event.id, fileName:event.fileName, fileSize: event.fileSize, canDelete:true});
    }
    
 }

 downloadOrDeleteFile(event: any, file:any){
  event.preventDefault();
  file.canDelete ? this.deleteFile(file) : this.downloadFile(file) ;
 }

 private downloadFile(file: any){
  this.#serviceRequestService.downloadRequestTreatmentResult(file.id);
}

  private deleteFile(file: any){
    const index = this.requestTreatmentResult.findIndex((item:any) => item.id === file.id);
    if (index > -1) { // only splice array when item is found
      this.requestTreatmentResult.splice(index, 1); // 2nd parameter means remove one item only
    }
    
    const indexfileToAdd = this.fileToAdd.findIndex(item => item.id === file.id);
    if (indexfileToAdd > -1) { // only splice array when item is found
      this.fileToAdd.splice(indexfileToAdd, 1); // 2nd parameter means remove one item only
    }
  }

  savechange() {
    if(this.monitorCtrl.value === ''){
      return;
    }

    this.req['requestTreatmentStatus'] = this.#serviceRequestService.updateRequestTreatmentStatus({
      requestTreatmentId: this.id, 
      status: this.statusCtrl.value ?? '', 
      monitorId: this.monitorCtrl.value != undefined ? +this.monitorCtrl.value : 0
    })
    
    // Conditionally add requestTreatmentResult property if files are to be added
    if (this.fileToAdd.length) {
      this.req['requestTreatmentResult'] = this.#serviceRequestService.saveRequestTreatmentResultFile({
        requestTreatmentId: this.id, 
        files: this.fileToAdd
      });
    }

    forkJoin(this.req)
    .subscribe({
      next: (response: any) => {
        this.fetchDatas();
      },
      error: (error: any) => {
        this.logService.error(error);
      }   
    });
  }
}
