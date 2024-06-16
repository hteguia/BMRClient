import { AbstractControl } from "@angular/forms";

export function phoneNumberValidator(ctrl: AbstractControl){
    if(ctrl.value && ctrl.value.startsWith("+")){
        return null;
    }
    return {
        phoneNumberValidator: 'Invalid phone number'
    };
}