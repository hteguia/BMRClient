import { AfterViewInit, Component, OnDestroy, ViewChild, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';


import * as intlTelInput from 'intl-tel-input';
import { BaseControlValueAccessor } from '../base-control-value-accessor.component';

@Component({
  selector: 'app-tel-input',
  template: `
    <div class="container" style="padding-left:0px; padding-right:0px"> <input #telInput matInput type="tel"
                    class="form-control {{isInvalid ? 'text-danger': ''}}"
                        (focus)="onFocus()"
                        (blur)="onBlur()"
                        (keypress)="onInputKeyPress($event)" 
                        (input)="onChange(iti.getNumber())" >
    </div>
    <div class="error-container">
      <ng-container *ngIf="control.touched">
        <ng-content select="app-error"/>
      </ng-container>
    </div>
  `,
  styles: [`
      ::ng-deep .iti{
        position: relative!important;
        display: inline!important;
        height: auto!important;
      }

      ::ng-deep .iti .form-control{
          border:1px solid  rgba(0,0,0,0.3)!important;
      }

      .text-danger{
          border:1px solid  red!important;
      }

      ::ng-deep .iti input{
          width:100%!important; 
          padding-top:9px; 
          padding-bottom:9px; 
          height: auto!important
      }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TelInputComponent),
      multi: true
    }
  ]
})
export class TelInputComponent extends BaseControlValueAccessor<string> implements AfterViewInit,OnDestroy {
  
  @ViewChild('telInput') telInput:any;
  iti:any;
  selectedCountryCode:any;
  isInvalid = false

  ngAfterViewInit(){
    //definir le format du numero de telephone par defaut
    this.iti = intlTelInput(this.telInput.nativeElement, {
        utilsScript: "assets/scripts/utils.js",
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
    if(this.control.value !== null && this.control.value !== undefined){
      this.iti.setNumber(this.control.value);
    }
  }

  ngOnDestroy(){
    this.iti.destroy();
  }
  
  onFocus = () =>{
   
  }
    
  onBlur = ()=>{
    this.isInvalid = !this.iti.isValidNumber();
    this.onTouched();
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
}
