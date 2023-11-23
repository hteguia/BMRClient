import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function numbersValidator(): null | ValidatorFn{
    return function ( control: AbstractControl ) {
        const value = control.value;
        if(value){
          let numbers = value.split(',');
          let allIsNumber = numbers.every(isNumber);
          if ( !allIsNumber) {
            return {
              numbersValidator: true
            }
          }

          return null;
        }
        
        return null;
      };
   
}

function isNumber(element:string, index:any, array:any) {
  return !isNaN(parseInt(element))
}