import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name :'username'
})
export class UsernamePipe implements PipeTransform{
    transform(value: {firstName:string, lastName:string }): string {
        return `${value.lastName.toUpperCase()} ${value.firstName}`;
    }

}