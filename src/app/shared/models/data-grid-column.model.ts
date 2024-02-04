export class DataGridColumn
{
    dataField!: string;
    caption!: string;
    dataType!: string;
    visible?: boolean = true;
    template?: '' | 'statusTemplate' | 'amountTemplate' | 'dateTemplate' = ''; 
    calculateCellValue?:  '' | 'concatValue' = ''
    alignment?: 'center' | 'left' | 'right' = 'left';
    width?: number = 100;
}
