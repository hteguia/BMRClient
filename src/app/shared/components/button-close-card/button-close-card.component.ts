import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button-close-card',
  templateUrl: './button-close-card.component.html',
  styleUrls: ['./button-close-card.component.css']
})
export class ButtonCloseCardComponent {

  @Output() close = new EventEmitter();

  onClose(){
    this.close.emit();
  }

  
}
