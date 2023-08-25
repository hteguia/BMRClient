import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function ValidValidator(): ValidatorFn{
    return (ctrl: AbstractControl) : null | ValidationErrors => {
        if(ctrl.value.includes('VALID')){
            return null;
        }else{
            return {ValidValidator:ctrl.value
        }
    };
    }
}