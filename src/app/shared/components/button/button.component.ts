import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionTypes } from '../../pages/base-grid-page/base-grid-page.component';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {

  @Input() label: string = "label";
  @Input() icon: string = "";
  @Input() toolTip: string = "";
  @Input() color: string = "";
  @Input() cssClass: string = "";
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() actionType: string = "NAVIGUATE";
  @Input() action: string = "";

  @Output() click = new EventEmitter();

  onClick(event: MouseEvent){
    event.stopPropagation();
    this.click.emit({actionType: this.actionType, action: this.action});
  }
}
