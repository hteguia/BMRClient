import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "./material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { ShorthenPipe } from "./pipes/shorten.pipe";
import { TimeAgoPipe } from "./pipes/time-ago.pipe";
import { HighlightDirective } from "./directives/highlight.directive";
import { DxDataGridModule } from 'devextreme-angular';
import { DataGridComponent } from "./components/data-grid/data-grid.component";
import { FileUploadComponent } from "./components/file-upload/file-upload.component";
import { FileInputComponent } from "./components/file-input/file-input.component";
import { DataGridFilterComponent } from "./components/data-grid-filter/data-grid-filter.component";
import { AmountPipe } from "./pipes/amount.pipe";
import { ButtonCloseCardComponent } from "./components/button-close-card/button-close-card.component";
import { DecimalSeparatorPipe } from "./pipes/decimal.separator.pipe";
import { ButtonComponent } from "./components/button/button.component";
import { InputComponent } from "./components/input/input.component";
import { ProgressComponent } from "./components/progress/progress.component";
import { TelInputComponent } from "./components/tel-input/tel-input.component";
import { SpinnerComponent } from "./components/spinner/spinner.component";



@NgModule({
    declarations: [
        ShorthenPipe,
        TimeAgoPipe,
        HighlightDirective,
        DataGridComponent,
        FileUploadComponent,
        FileInputComponent,
        DataGridFilterComponent,
        AmountPipe,
        ButtonCloseCardComponent,
        DecimalSeparatorPipe,
        ButtonComponent,
        InputComponent,
        ProgressComponent,
        TelInputComponent,
        SpinnerComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        DxDataGridModule,
    ],
    exports:[
        MaterialModule,
        ReactiveFormsModule,
        ShorthenPipe,
        TimeAgoPipe,
        HighlightDirective,
        DxDataGridModule,
        DataGridComponent,
        FileUploadComponent,
        FileInputComponent,
        DataGridFilterComponent,
        AmountPipe,
        ButtonCloseCardComponent,
        DecimalSeparatorPipe,
        ButtonComponent,
        InputComponent,
        ProgressComponent,
        TelInputComponent,
        SpinnerComponent
    ]
})

export class SharedModule { }