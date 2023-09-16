import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  
  @Input() placeholder!: string;
  @Input() label!:string;
  @Input() required = false;
  @Input() minLength!: number;
  @Input() maxLength!: number;
 
  inputCtrl!: FormControl;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
