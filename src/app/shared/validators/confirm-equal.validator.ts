import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function confirmEqualValidator(main: string, confirm: string): null | ValidatorFn{
    return (ctrl: AbstractControl) : ValidationErrors | null  => {
        if(!ctrl.get(main) || !ctrl.get(confirm)){
            return {
                confirmEqual: 'Invalid controle names'
            };
        }

        // const mainValue = ctrl.get(main)!.value;
        // const confirmalue = ctrl.get(confirm)!.value;
        
        // return mainValue === confirmalue ? null : {
        //     confirmEqual: {
        //         main: mainValue,
        //         confirm: confirmalue
        //     }
        // };

        return {
            error: 'Not implemented'
        }
        
    };
}

