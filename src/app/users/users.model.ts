export interface CollaboraterModel{
    id:number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    role: string;
    roleId: string;
}

export interface PartnerModel{
    id:number;
    name: string;
    numberOfStudents: number;
}

export interface RoleModel{
    id:number;
    name: string;
}

export interface StudentModel{
    id:number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    faculty: string;
    category: string;
    partner: string;
}