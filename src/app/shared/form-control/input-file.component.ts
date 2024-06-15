import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, HostListener, Inject, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { LogService } from 'src/app/core/services/log.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-input-file',
    template: `
        <div class="file-drop-area">
            <span class="fake-btn">{{ label }}</span>
            <span class="file-msg">{{file ? file.name : placeholder }}</span>
            <input class="file-input" type="file">
            
        </div>
        <small class="label-danger">extension [{{extension.join(', ')}}] Taille max: {{maxLength }} mb </small>
        <app-progress [progress]="progress"></app-progress>
        
    `,
    styles: [`
        .file-drop-area {
            border: 1px dashed #7c7db3;
            border-radius: 3px;
            position: relative;
            width: 100%;
            max-width: 100%;
            padding: 26px 20px 30px;
            -webkit-transition: 0.2s;
            transition: 0.2s;
          }
          
          .file-drop-area.is-active {
            background-color: #3F4069;
          }
          
          .fake-btn {
            background-color: var(--primary);
            border: 1px solid var(--primary);
            border-radius: 3px;
            padding: 8px 15px;
            margin-right: 8px;
            font-size: 12px;
            text-transform: uppercase;
            color: #fff;
            font-weight: bold;
          }
          
          .file-msg {
            font-size: small;
            font-weight: 300;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: inline-block;
            max-width: calc(100% - 130px);
            vertical-align: middle;
          }
          
          .file-input {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            width: 100%;
            cursor: pointer;
            opacity: 0;
          }
          
          .file-input:focus {
            outline: none;
          }
          
          .mat-toolbar-single-row {
            height: auto !important;
            background: transparent;
            padding: 0;
          }
          
          .progress-bar {
            padding: 0;
          }
          
          .progress {
            width: 50px;
          }
          
          .label-sucess{
            color: #1e7e34 !important;
          }
          
          .label-error{
            color: #dc3545;
          }
    `],
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: InputFileComponent,
        multi: true
      }
    ]
  })
export class InputFileComponent implements ControlValueAccessor { 
    
    @Input({required: true}) placeholder = 'or drag and drop file here';
    @Input({required: true}) label = 'Choose a file';
    @Input() uploadUrl = ''; //uploadUrl="/v1/file/upload"
    @Input() extension = ['pdf','zip','docx','xlsx'];
    @Input() maxLength = 10;
    
    file: File | null = null;
    progress = 0;

    constructor(private http: HttpClient, private logService: LogService) { }

    onChange = (file: File) => {
     
    };

    onTouched = () => {};


    writeValue(obj: any): void {
        this.file = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
        const file = event && event.item(0);  
        this.file = file;

        if(this.uploadUrl?.trim() !== ''){
            console.log('uploadUrl', this.uploadUrl)
            this.onUpload();
        } 

        this.onChange(this.file!);
    }

    onUpload(): void {
  
        if (this.file == null) {
          return;
        }
        const formData = new FormData();
        formData.append('file', this.file, this.file.name);
        
        this.http.post(`${environment.apiUrl}${this.uploadUrl}`, formData, {reportProgress: true, observe: 'events'})
          .subscribe({
            next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress)
              this.progress = Math.round(100 * event.loaded / event.total!);
            else if (event.type === HttpEventType.Response) {
              //this.uploaded = true;
              //this.message = 'Fichier chargé avec success.';
              //this.onUploadFinished.emit(event.body);
              //this.logService.log(event.body)
            }
          },
          error: (err: HttpErrorResponse) => {
            this.logService.log(err);
          }
        });
        
      }
}