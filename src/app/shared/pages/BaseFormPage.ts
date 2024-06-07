import { FormGroup } from "@angular/forms";

export class BaseFormPage {
    mainForm!: FormGroup;

    loading!: boolean;

    protected  initMainForm(): void {}
    protected initObservables(): void {}
    protected onSubmitForm(): void {}
    protected resetForm(): void {}
    protected  initFormControls(): void{}
}