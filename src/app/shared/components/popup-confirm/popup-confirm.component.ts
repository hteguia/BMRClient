import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/users/partner-add/add-partner.component';

@Component({
  selector: 'app-popup-confirm',
  templateUrl: './popup-confirm.component.html',
  styleUrls: ['./popup-confirm.component.css']
})
export class PopupConfirmComponent {

  title!: string;
  content!: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, 
  public dialogRef: MatDialogRef<PopupConfirmComponent>,) {

  }

  ngOnInit(): void {
    this.title = this.data.title;
    this.content = this.data.data;
  }
  onAction(event: any){             
    this.dialogRef.close(event);
  }
}
