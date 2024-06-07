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