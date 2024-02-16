import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-check',
  templateUrl: './task-check.component.html',
  styleUrls: ['./task-check.component.css']
})
export class TaskCheckComponent {
  @Input() code: string = 'dfg';
  @Input() label: string = 'dfg';
  @Input() date: string = '';
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;

  @Output() onCheckedChange = new EventEmitter();

  onChange(event: any){
    this.onCheckedChange.emit({code: this.code, val: event.target.checked});
  }

}
