import { Pipe, PipeTransform } from "@angular/core";
import { StatusEnum } from "src/app/core/enums/status.enum";


@Pipe({
    name :'status'
})
export class StatusPipe implements PipeTransform{
    transform(value: string | undefined | null): string {
        if(value === null || value === undefined) return "";
        switch (value) {
            case StatusEnum.INITIATE:
              return "Enregistrement initiale";
            case StatusEnum.EN_ATTENTE_TRAITEMENT:
              return "En attente de traitement";
            case StatusEnum.TRAITEMENT_ENCOURS:
              return "Traitement en cours";
            case StatusEnum.TRAITEMENT_TERMINE:
                return "Traitement terminé";
            case StatusEnum.OUI:
              return "Oui";
            case StatusEnum.NON:
              return "Non";
            default:
              return "Status inconnu";
          }
    }

}