import { Component, EventEmitter, Input, Output, ViewChild, inject } from "@angular/core";
import { DxContextMenuComponent, DxDataGridComponent } from "devextreme-angular";
import { DataGridColumn } from "../../models/data-grid-column.model";
import { LogService } from "src/app/core/services/log.service";
import { StatusEnum } from "src/app/core/enums/status.enum";

@Component({
    selector: 'app-data-grid',
    templateUrl: './data-grid.component.html',
    styleUrls: ['./data-grid.component.css'],
})
export class DataGridComponent  {

    @Input() columns!: DataGridColumn[];
    @Input() dataSource!: any;
    @Input() contextMenu!: any;
    @Input() showCheckBox: 'always' | 'never' = 'never';
    @Output() selectedRow = new EventEmitter<[]>();
    @Output() rowClick = new EventEmitter<any>();
    @Output() contextMenuClick = new EventEmitter<any>();

    @ViewChild("gridContainer") gridContainer!: DxDataGridComponent;
    @ViewChild('myContextMenu') myContextMenu!: DxContextMenuComponent;

    allMode = 'allPages';
    allowedPageSizes = [5, 10, 'all'];
    displayModes = [
        { text: "Display Mode 'full'", value: 'full' }, 
        { text: "Display Mode 'compact'", value: 'compact' }
    ];
    displayMode = 'full';
    showPageSizeSelector = true;
    showInfo = true;
    showNavButtons = true;

    idSelected!:number

    private logService = inject(LogService);

    /**
     * Cette fonction est déclenchée lorsque la sélection change.
     * Elle émet les clés de la ligne sélectionnée.
     *
     * @param event - L'événement de changement de sélection.
     */
    onSelectionChanged(event:any){
        this.selectedRow.emit(event.selectedRowKeys);
    }

    /**
     * Cette fonction est déclenchée lorsqu'on clique sur une ligne.
     * Elle peut être utilisée pour effectuer une action spécifique en réponse à cet événement.
     *
     * @param event - L'événement de clic sur la ligne.
     */
    onRowClick(event:any){
        this.rowClick.emit(event.data);
    }

    /**
     * Cette fonction est déclenchée lorsqu'un élément du menu contextuel est cliqué.
     * Elle peut être utilisée pour effectuer une action spécifique en réponse à cet événement.
     *
     * @param event - L'événement de clic sur l'élément du menu contextuel.
     */
    contextMenuItemClick(e:any) {
        const eventData = { id: this.idSelected, action: this.contextMenu[e.itemIndex] };
        this.contextMenuClick.emit(eventData);
    } 

    /**
     * Cette fonction est utilisée pour personnaliser la valeur affichée dans une cellule de la grille de données.
     * Elle prend en entrée les données de la ligne et renvoie la valeur personnalisée à afficher.
     *
     * @param rowData - Les données de la ligne pour laquelle la cellule est rendue.
     * @returns La valeur personnalisée à afficher dans la cellule.
     */
    customCellValue(rowData:any) {
        const column = this as any;
        
        const dataFields = column.dataField.split(':');
        if (dataFields.length <= 1) {
            return rowData[column.dataField];
        }

        if (dataFields[0] === "concat") {
            const fields = dataFields.slice(1);
            return fields.map((field:string) => rowData[field]).join(' ');
        }

       return rowData[column.dataField];
    }

    onPreparingData(e:any){
        this.idSelected = e.row.data.id;
    }

    getClass(val:string):string{
        return val == StatusEnum.TRAITEMENT_TERMINE ? 'badge-success' : 
               val == StatusEnum.TRAITEMENT_ENCOURS ? "badge-warning" : "badge-danger";
    }
}