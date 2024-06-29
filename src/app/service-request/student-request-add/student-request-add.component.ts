import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BaseFormPage } from 'src/app/shared/pages/BaseFormPage';
import { DocumentType, toFormData } from '../service-request.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceRequestService } from '../service.request.service';

@Component({
  selector: 'app-student-request-add',
  templateUrl: './student-request-add.component.html',
  styleUrls: ['./student-request-add.component.css']
})
export class StudentRequestAddComponent extends BaseFormPage {

  serviceRequestService = inject(ServiceRequestService)

  listDocumentType$!: Observable<DocumentType[]>

  documentTypeCtrl!: FormControl;
  deadlineCtrl!: FormControl;
  contentFileCtrl!: FormControl;

  studentId!: string;

  deadLineList = [
    { id:"24 Heures", name:"24 Heures" },
    { id:"48 Heures", name:"48 Heures" },
    { id:"72 Heures", name:"72 Heures" },
    { id:"5 Jours", name:"5 Jours" },
    { id:"1 Semaine", name:"1 Semaine" },
    { id:"2 Semaines", name:"2 Semaines" },
    { id:"1 Mois", name:"1 Mois" },
    { id:"+1 Mois", name:"+1 Mois" }
  ]

  constructor(router: Router, route: ActivatedRoute, formBuilder: FormBuilder) {
    super(router, route, formBuilder);
  }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('id')!

    this.listDocumentType$ = this.route.data.pipe(
      map(data => data['data'])
    )

    this.initFormControls();
    this.initMainForm();
  }

  protected override initFormControls(): void {
    this.documentTypeCtrl = new FormControl('', Validators.required);
    this.deadlineCtrl = new FormControl('', Validators.required);
    this.contentFileCtrl = new FormControl('', Validators.required);
  }

  protected override initMainForm(): void {
    this.mainForm = this.formBuilder.group({
      contentFile: this.contentFileCtrl,
      serviceType: this.documentTypeCtrl,
      deadline: this.deadlineCtrl
    });
  }

  protected override onSubmitForm(): void {
    this.loading = true;
    const formData = toFormData(this.mainForm.value);
    formData.append('studentId', this.studentId);
    formData.append('file', this.contentFileCtrl.value);
    this.serviceRequestService.addRequestTreatment(formData).subscribe(
      (response) =>{
        this.loading = false;
        this.resetForm();
        this.router.navigateByUrl(`/service-request/student/${this.studentId}/request-treatment`);
      },
      (error) =>{
        this.loading = false;
        Object.keys(error.error).forEach(prop => {
          const formControl = this.mainForm.get('name');
          if (formControl) {
            formControl.setErrors({
              serverError: error.error[prop]
            });
          }
        });
      }
    )
  }
}
