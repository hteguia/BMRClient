import { Component, Input, inject } from '@angular/core';
import { RequestTreatmentService } from '../../services/request-treatment.service';
import { FileService } from 'src/app/core/services/file.service';
import { LogService } from 'src/app/core/services/log.service';

@Component({
  selector: 'app-request-treatment-detail',
  templateUrl: './request-treatment-detail.component.html',
  styleUrls: ['./request-treatment-detail.component.css']
})
export class RequestTreatmentDetailComponent {
  
  @Input()requestTreatment!: any;

  private requestTreatmentService = inject(RequestTreatmentService);
  private logService = inject(LogService);

  downloadRequestTreatment(event:any){
    this.requestTreatmentService.downloadRequestTreatment(this.requestTreatment.id, this.requestTreatment.fileName);
  }
}
