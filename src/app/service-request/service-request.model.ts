export interface DocumentModel 
{
    id:number;
    name: string;
}

export interface ServiceRequest 
{
    id:number;
    serviceType: string;
    deadline: string;
    contentFile: File;
    file: File;
}

export interface DocumentType 
{
    id:number;
    name: string;
    description:string;
}

export interface StudentRequest{
    id:number;
    firstName: string;
    lastName: string;
    email: string;
    partner: string;
    numberOfRequests: number;
}

export interface RequestTreatmentDetail{
    id:number;
    serviceType: string | undefined | null;
    deadline: string | undefined | null;
    contentFile: File;
    file: File;
    createAt: Date | undefined | null;
    treatmentStatus: string | undefined | null;
    fileName: string;
    collaboraterId: number;
}

export function toFormData( formValue: any ) {
    const formData = new FormData();
  
    for ( const key of Object.keys(formValue) ) {
      const value = formValue[key];
      formData.append(key, value);
    }
  
    return formData;
  }

  export interface DocumentTemplateModel{
    id:number;
    name: string;
}

export interface DocumentTypeModel{
    id:number;
    name: string;
    description:string;
}

export interface RequestTreatmentModel{
    id:number;
    serviceType: string;
    deadline: string;
    contentFile: File;
    file: File;
    createAt: Date;
}