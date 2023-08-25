import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CommentsComponent } from './components/comments/comments.component';
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


@NgModule({
    declarations: [
        CommentsComponent,
        ShorthenPipe,
        TimeAgoPipe,
        HighlightDirective,
        DataGridComponent,
        FileUploadComponent,
        FileInputComponent,
        DataGridFilterComponent,
        AmountPipe,
    ],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        DxDataGridModule
    ],
    exports:[
        CommentsComponent,
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
    ]
})

export class SharedModule { }