import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestTreatmentService } from '../../services/request-treatment.service';
import { FileService } from 'src/app/core/services/file.service';
import { LogService } from 'src/app/core/services/log.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-request-treatment-result',
  templateUrl: './request-treatment-result.component.html',
  styleUrls: ['./request-treatment-result.component.css']
})
export class RequestTreatmentResultComponent {

  @Input()requestTreatment!: any;
  @Output() updatedChange = new EventEmitter();

  private requestTreatmentService = inject(RequestTreatmentService);
  private fileService = inject(FileService);
  private logService = inject(LogService);
  private authService = inject(AuthService);

  FileToAdd: any[] = [];
  fileList: any[] = [];
  updated = false;

  currentUser!:any;

  ngOnInit() {
    this.reload();
    this.currentUser = this.authService.userProfil;
  }

  getFileResult(){
    this.requestTreatmentService.getRequestTreatmentResult(this.requestTreatment.id).subscribe(
      {
        next: (response: any) => {
          this.fileList = response.map((file: any) => {
            return {id: file.id, fileName:file.fileName, fileSize: file.fileSize, isDownloadable:true};
          });
        },
        error: (error: any) => {
          this.logService.error(error);
        }
      }
    );
  }

  reload(){
    this.getFileResult();
    this.FileToAdd = [];
  }

  onUploadFinished(event: any){
     this.FileToAdd.push({id:event.id, fileName:event.fileName});
     this.fileList.push({id: event.id, fileName:event.fileName, fileSize: event.fileSize, isDownloadable:false});
     this.updated = true;
     this.updatedChange.emit();
  }

  saveChange(): Observable<any>{
    return this.requestTreatmentService.saveResult(
    {
      requestTreatmentId: +this.requestTreatment.id, 
      files:this.FileToAdd
    });
  }

  get valid() : boolean {
    return true;
  }
  downloadOrDeleteFile(event: any, file:any){
    event.preventDefault();
    file.isDownloadable ? this.downloadFile(file) : this.deleteFile(file);
  }

  private downloadFile(file: any){
    this.requestTreatmentService.getResult(file.id).subscribe(
      {
        next: (response: any) => {
          this.requestTreatmentService.downloadRequestTreatmentResult(file.id).subscribe((event) => {
            this.fileService.download({event:event, name:response.fileName});
          });
        },
        error: (error: any) => {
          this.logService.error(error);
        }
      }
    );
  }

  private deleteFile(file: any){
    const index = this.fileList.findIndex(item => item.id === file.id);
      if (index > -1) { // only splice array when item is found
        this.fileList.splice(index, 1); // 2nd parameter means remove one item only
      }
      
      const indexa = this.FileToAdd.findIndex(item => item.id === file.id);
      if (indexa > -1) { // only splice array when item is found
        this.FileToAdd.splice(indexa, 1); // 2nd parameter means remove one item only
      }
  }

  hasRole(roles: any):boolean{
    return roles.includes(this.currentUser.role)
  }
}
