import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

export class BaseFormPage {
    mainForm!: FormGroup;

    loading!: boolean;

    constructor(protected router: Router, protected route: ActivatedRoute, protected formBuilder: FormBuilder){}

    protected  initMainForm(): void {}
    protected initObservables(): void {}
    protected onSubmitForm(): void {}
    protected resetForm(): void {}
    protected  initFormControls(): void{}
}