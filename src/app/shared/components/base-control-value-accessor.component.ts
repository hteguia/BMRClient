import { Injectable, Injector, OnInit, inject } from "@angular/core";
import { ControlValueAccessor, Form, FormControl, FormControlDirective, FormControlName, FormGroupDirective, NgControl, NgModel } from "@angular/forms";

@Injectable()
export abstract class BaseControlValueAccessor<T> implements ControlValueAccessor, OnInit {
    
    
    injector = inject(Injector);
    value!: T;
    control!: FormControl;
    
    ngOnInit(): void {
        this.control = this.getControl();
    }
    

    onChange = (value: T) => {};
    onTouched = () => {};

    writeValue(value: T): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    getControl(): FormControl<any> {
        const injectedControl = this.injector.get(NgControl);
        switch(injectedControl.constructor){
            case FormControl:
                return (injectedControl as NgModel).control;
            case FormControlName:
                return this.injector.get(FormGroupDirective).getControl(injectedControl as FormControlName);
            default:
                return (injectedControl as FormControlDirective).form as FormControl;
        }
    }
}