import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileInputComponent,
      multi: true
    }
  ]
})
export class FileInputComponent implements ControlValueAccessor {
  onChange!: Function;
  file: File | null = null;
  @Input() progress = 0;
  @Input() upload = false;
  // @Input() formControlName!: string;
  // formControl!: FormControl;
  
 
  message: string = '';
  uploaded = true;

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    if(this.onChange){
      this.onChange(file);
    }

    this.progress = 0;
    this.message = '';
    this.file = file;

    this.onFileChange.emit(file);
    //console.log(file)
    if(this.upload){
      this.onUpload();
    } 
  }

  
 

  @Output() public onUploadFinished = new EventEmitter();
  @Output() public onFileChange = new EventEmitter();


  
  constructor( private host: ElementRef<HTMLInputElement>, private http: HttpClient ) {
   //this.formControl = this.rootFormControl.control.get('file') as FormControl;
   
  }

  writeValue( value: null ) {
    // clear file input
    this.host.nativeElement.value = 'muu';
    this.file = null;
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
  }

  onUpload(): void {
  
    if (this.file == null) {
      return;
    }
    this.message = '';
    this.uploaded = false;
    this.progress = 0;
    const formData = new FormData();
    formData.append('file', this.file, this.file.name);
    
    this.http.post(`${environment.apiUrl}/v1/file/upload`, formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total!);
        else if (event.type === HttpEventType.Response) {
          this.uploaded = true;
          this.message = 'Fichier chargé avec success.';
          console.log(event.body)
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.uploaded = false
        this.message = 'Ploblème lors du chargement du fichier.'
        console.log(err)
      }
    });
    
  }
}
