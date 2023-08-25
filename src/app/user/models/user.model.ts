export class User{
    id!:number;
    firstName!:string;
    lastName!:string;
    email!:string;

    get getFullName(): string{
        return `${this.firstName} ${this.lastName}`
    }
}