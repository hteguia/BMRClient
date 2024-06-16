import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-task-check',
  templateUrl: './task-check.component.html',
  styleUrls: ['./task-check.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TaskCheckComponent,
      multi: true
    }
  ]
})
export class TaskCheckComponent implements ControlValueAccessor {
  
  @Input() code!: string;
  @Input() label: string = 'LABEL';
  @Input() date: string = '';
  @Input() checked: boolean = true;
  @Input() disabled: boolean = false;

  inputCtrl!: FormControl

  constructor(){
    
  }
  // @Output() onCheckedChange = new EventEmitter();

  // onChange(event: any){
  //   this.onCheckedChange.emit({code: this.code, val: event.target.checked});
  // }

  ngOnInit(){
    this.inputCtrl = new FormControl({value: this.checked, disabled: this.disabled});    
  }
  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(obj: any): void {
    console.log(obj)
    this.checked = obj;
    
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    
  }

  onCheckedChange(event: any){
    this.checked = event.target.checked;
    this.onChange(this.code);
    //this.onChange({code: this.code, val: event.target.checked});
  }

}
