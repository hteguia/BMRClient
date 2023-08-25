import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function requiredFileTypeValidator(types: string[]): ValidatorFn{
    return function ( control: AbstractControl ) {
        const file = control.value;
        if ( file ) {
          const extension = file.name.split('.')[1].toLowerCase();
          if ( !types.includes(extension.toLowerCase()) ) {
            return {
                requiredFileTypeValidator: true
            };
          }
    
          return null;
        }
    
        return null;
      };
}