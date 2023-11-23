import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { DxDataGridComponent } from "devextreme-angular";
import { Observable } from "rxjs";
import { DxiDataGridColumn } from "devextreme-angular/ui/nested/base/data-grid-column-dxi";
import { DataGridColumn } from "../../models/data-grid-column.model";

@Component({
    selector: 'app-data-grid',
    templateUrl: './data-grid.component.html',
    styleUrls: ['./data-grid.component.css'],
})
export class DataGridComponent implements OnInit {

    @Input() columns!: DataGridColumn[];
    @Input() dataSource!: any;
    @Output() selectedRow = new EventEmitter<[]>();
    @Output() rowClick = new EventEmitter<any>();

    @ViewChild("gridContainer") gridContainer!: DxDataGridComponent;

    allMode = 'allPages';
    checkBoxesMode = 'always';
    allowedPageSizes = [5, 10, 'all'];
    displayModes = [
        { text: "Display Mode 'full'", value: 'full' }, 
        { text: "Display Mode 'compact'", value: 'compact' }
    ];
    displayMode = 'full';
    showPageSizeSelector = true;
    showInfo = true;
    showNavButtons = true;

    dataGridColumns: Array<any> = [];

    ngOnInit(): void {
       
    }

    onSelectionChanged(event:any){
        this.selectedRow.emit(event.selectedRowKeys);
    }

    onRowClick(event:any){
        this.rowClick.emit(event.data);
    }

    concatuu(rowData:any, e:[]):string {
        let value = '';
         for(let t of e){
            value = value + ' '+ rowData[t]
         }
         return value;
    }

    calculateCellValue(rowData:any) {
        let column = this as any;
        if(!column.visible) {
            return ''
        }
       const dataFields = column.dataField.split(':');
       if(dataFields.length > 1)
       {
            if(dataFields[0] === "concat"){
                const  fields = dataFields.slice(1, dataFields.length);
                let value = '';
                for(let field of fields){
                    value = value + ' '+ rowData[field]
                }
                return value;
            }
       }
       return rowData[column.dataField];

       
       
       
    //    if(tt.length > 1){
    //     let value = '';
    //      for(let t of tt){
    //         value = value + ' '+ rowData[t]
    //      }
    //      return value;
    //    }
      
    //    return rowData[column.dataField];

    //    let appoColumn = column.dataField + '_EXT';
    //    let value: Boolean = rowData[column.dataField];
    //    let appoExtension: string = rowData[appoColumn];
    //    let immagine: string;

    //    if (value) {
    //        // console.log(this.customDocumentIcons);
    //        // if(this.customDocumentIcons.filter(appoExtension.toUpperCase).length > 0){
    //        //     //icona custom
    //        //     immagine = '../../../../../assets/icons/document/_customDocumentIcons/' + appoExtension.toUpperCase() + '.svg';
    //        // }else{
    //            immagine = '../../../../../assets/icons/document/';
    //        // }
    //    } else {
    //        immagine = '';
    //    }
    //    return immagine;
    }
}
