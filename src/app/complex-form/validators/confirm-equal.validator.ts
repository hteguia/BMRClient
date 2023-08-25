import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmEqualValidator(main: string, confirm: string): ValidatorFn{
    return (ctrl: AbstractControl) : null | ValidationErrors => {
        if(!ctrl.get(main) || !ctrl.get(confirm)){
            return {
                confirmEqual: 'Invalid controle names'
            };
        }

        const mainValue = ctrl.get(main)!.value;
        const confirmalue = ctrl.get(confirm)!.value;
        
        return mainValue === confirmalue ? null : {
            confirmEqual: {
                main: mainValue,
                confirm: confirmalue
            }
        };
    };
}