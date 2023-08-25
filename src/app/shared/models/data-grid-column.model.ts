export class DataGridColumn
{
    dataField!: string;
    caption!: string;
    dataType!: string;
    visible?: boolean = true;
    template?: '' | 'statusTemplate' | 'amountTemplate' = ''; 
    calculateCellValue?:  '' | 'concatValue' = ''
}

//'' | 'default' | 'active' | 'statusTemplate' = 'default';