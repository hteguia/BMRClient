import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Optional, Output, Self, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';


import * as intlTelInput from 'intl-tel-input';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tel-input',
  templateUrl: './tel-input.component.html',
  styleUrls: ['./tel-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TelInputComponent),
      multi: true
    }
  ]
})
export class TelInputComponent implements OnInit, AfterViewInit, OnChanges,OnDestroy, ControlValueAccessor {
  
  @ViewChild('telInput') telInput:any;
  myForm! : FormGroup;
  public phoneNumber!: string;
  iti:any;
  selectedCountryCode:any;

  @Input() cssClass = 'form-control';
  @Output() phoneNumberChange = new EventEmitter<{isInvalid: boolean, value: string}>();
  @Input()control!:FormControl
  isInvalid = false

  private onChange!: (value: string) => void;
  private onTouched!: () => void;


  writeValue(obj: any): void {
    this.phoneNumber = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onChange = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    
  }

  
    
  ngOnInit(){
        
  }

  ngAfterViewInit(){
    // const input = document.querySelector("#" + this.inputId);
    this.iti = intlTelInput(this.telInput.nativeElement, {
        utilsScript: "assets/scripts/utils.js",
        //initialCountry: "auto",
        nationalMode: true,
        formatOnDisplay: true,
        initialCountry : "auto" , 
        geoIpLookup : function ( callback )  { 
          fetch ( "https://ipapi.co/json" ) 
            . then ( function ( res )  {  return  res . json ( ) ;  } ) 
            . then ( function ( data )  {  callback ( data . country_code ) ;  } ) 
            . catch ( function ( )  {  callback ( "nous" ) ;  } ) ; 
        } 
    });
    this.selectedCountryCode = this.iti.getSelectedCountryData().dialCode;
  }

  ngOnChanges(changes: any) {
		
  }

  ngOnDestroy(){
    this.iti.destroy();
  }
  
  onFocus = () =>{
      if(this.phoneNumber == undefined || this.phoneNumber == ""){
          let getCode = this.iti.getSelectedCountryData().dialCode;
          this.phoneNumber = "+" + getCode;
      }
  }
    
  onBlur = ()=>{
      this.isInvalid = false;
      if(this.phoneNumber != undefined && this.phoneNumber.trim()){
          if(this.iti.isValidNumber()){
              this.isInvalid = false;
          }
          else{
              this.isInvalid = true;
          }
      } 
  }

    onInputKeyPress = (event: KeyboardEvent) =>{
        const allowedChars = /[0-9\+\-\ ]/;
        const allowedCtrlChars = /[axcv]/; // Allows copy-pasting
        const allowedOtherKeys = [
          'ArrowLeft',
          'ArrowUp',
          'ArrowRight',
          'ArrowDown',
          'Home',
          'End',
          'Insert',
          'Delete',
          'Backspace',
        ];

      if (
        !allowedChars.test(event.key) &&
        !(event.ctrlKey && allowedCtrlChars.test(event.key)) &&
        !allowedOtherKeys.includes(event.key)
      ) {
        event.preventDefault();
      }
    }

    formatIntlTelInput() {
        if (typeof intlTelInputUtils !== 'undefined') { // utils are lazy loaded, so must check
            var currentText = this.iti.getNumber(intlTelInputUtils.numberFormat.E164);
            if (typeof currentText === 'string') { // sometimes the currentText is an object :)
                this.iti.setNumber(currentText); // will autoformat because of formatOnDisplay=true
            }
        }
    }

    onPhoneNumberChange = () =>{
        this.selectedCountryCode = this.iti.getSelectedCountryData().dialCode;
        //this.formatIntlTelInput();
        this.phoneNumberChange.emit({isInvalid: this.isInvalid, value: this.iti.getNumber()});
    }
}
