export interface ServiceRequest{
    id:number;
    serviceType:string;
    returnDeadline: string;
    status: string;
    createAt: Date;
    fileContent: File;
}