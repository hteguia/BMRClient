import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RequestTreatmentStatusEnum } from '../../models/enums/request.treatment.status.enum';
import { CollaboraterService } from 'src/app/users/services/collaborater.service';
import { RequestTreatmentService } from '../../services/request-treatment.service';
import { AbstractControl, FormControl } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { StatusEnum } from 'src/app/core/enums/status.enum';
import { LogService } from 'src/app/core/services/log.service';

@Component({
  selector: 'app-request-treatment-status',
  templateUrl: './request-treatment-status.component.html',
  styleUrls: ['./request-treatment-status.component.css']
})
export class RequestTreatmentStatusComponent {

  @Input()requestTreatment!: any;
  @Output() updatedChange = new EventEmitter();
  
  private RequestTreatmentService = inject(RequestTreatmentService);
  private collaboratorService = inject(CollaboraterService);
  private logService = inject(LogService);

  titleStatus = "Veuillez cocher les étapes, durant la phase de correction et enregistrer";
  slectedStatus: string = '';

  statusList = [
    { value: StatusEnum.INITIATE, date:'', checked:false, disabled: false},
    { value: StatusEnum.EN_ATTENTE_TRAITEMENT,  date:'', checked:false, disabled: false },
    { value: StatusEnum.TRAITEMENT_ENCOURS,  date:'', checked:false, disabled: false },
    { value: StatusEnum.TRAITEMENT_TERMINE,  date:'', checked:false, disabled: false },
  ];
  updated = false;
  monitorsList: any;

  monitorCtrl!: FormControl;
  statusCtrl!: FormControl;
  error = false

  initForm(){
    this.monitorCtrl = new FormControl(this.requestTreatment.collaboraterId);
    this.statusCtrl = new FormControl('');

    this.monitorCtrl.valueChanges.pipe(
      tap((value: any) => { this.updated = true; this.updatedChange.emit(); })
    ).subscribe();
  }

  ngOnInit(): void {
    this.initForm();

    this.getStatus();
    this.getCollaborators();
  }

  onCheckStatusChange(event: any){
    this.statusCtrl.setValue(event.val ? event.code : '');
    this.updated = true;
    this.updatedChange.emit();
  }

  get valid() : boolean{
    this.error = this.monitorCtrl.value == 0
    if(!this.updated){
      return true
    }
    return this.statusCtrl.value !== '' && this.monitorCtrl.value !== 0;
  }

  reload(){
    this.getStatus();
    this.error = false;
  }
  getStatus(){
    this.RequestTreatmentService.getStatus(+this.requestTreatment.id).subscribe({
      next: (response: any) => {
        this.updateStatus(response);
      },
      error: (error: any) => {
        this.logService.log(error);
      }
    });
  }
      
  private getCollaborators(){
    this.collaboratorService.getAllCollaborater().subscribe({
      next: (response: any) => {
        this.monitorsList = response.map((el: any)=> ({id: el.id, name: `${el.firstName} ${el.lastName}`}));
      },
      error: (error: any) => {
        this.logService.log(error);
      }
    });
  }
     
  private updateStatus(response: any){
    this.statusList.forEach((element: any, index: number) => {
      if(response.find((el: any)=> el.status === element.value)){
        element.date = response.find((el: any)=> el.status === element.value).createAt;
        element.checked = response.find((el: any)=> el.status === element.value).createAt;
        element.disabled = true;
      }
      else{
        element.disabled = index === 0 || this.statusList[index-1].date === '';
      }
     });
  }

  saveChange(): Observable<any>{
    console.log(this.monitorCtrl.value)
    if(this.monitorCtrl.value === 0){
      this.error = true;
    }
    return this.RequestTreatmentService.saveStatus(
    {
      requestTreatmentId: +this.requestTreatment.id, 
      status: this.statusCtrl.value, 
      monitorId: this.monitorCtrl.value
    });
  }

  get enableUpdateMonitor(): boolean{
    return this.requestTreatment.treatmentStatus !== StatusEnum.TRAITEMENT_TERMINE;
  }

  
}
