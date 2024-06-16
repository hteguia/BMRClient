import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';
import { ServiceRequestService } from '../service.request.service';
import { DocumentTypeModel } from '../service-request.model';
import { BaseGridPageComponent } from 'src/app/shared/pages/base-grid-page.component';

@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.css']
})
export class DocumentTypeComponent extends BaseGridPageComponent  {

  private serviceRequestService = inject(ServiceRequestService);

  documentType$!: Observable<DocumentTypeModel[]>;

  constructor(route: ActivatedRoute,  
    router: Router, private breadcrumpService: BreadcrumpService){  
    super(router, route);
  }

  override ngOnInit(): void {
    this.fetchListOfDocumentType();

    this.columns = [
      { dataField: "name",caption:"Libelle", dataType:"string", visible:true },
      { dataField: "description",caption:"Description", dataType:"string", visible:true }
    ];

    this.breadcrumpService.setBreadcrump("Liste des types de documents", [
      { title:"Demande de service", link:"/" }, 
      { title:"Type de document", link:"/" }
    ]);
  }

  fetchListOfDocumentType(): void {
    this.loading = true;
    this.documentType$ = this.serviceRequestService.getAllDocumentType()
  }

}
