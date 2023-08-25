import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-data-grid-filter',
  templateUrl: './data-grid-filter.component.html',
  styleUrls: ['./data-grid-filter.component.css']
})
export class DataGridFilterComponent implements OnInit {

  @Output() applyFilter = new EventEmitter();
  @Output() cancelFilter = new EventEmitter();

  startDate = Date.now();
  mainForm!: FormGroup;
  startDateCtrl!: FormControl;
  endDateCtrl!: FormControl;
  dateRangeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
  }

  private initFormControls(): void {
    this.startDateCtrl = this.formBuilder.control('');
    this.endDateCtrl = this.formBuilder.control('');
    this.dateRangeForm = this.formBuilder.group({
      startDate: this.startDateCtrl,
      endDate: this.endDateCtrl
    });
  }

  private initMainForm(): void{
    this.mainForm = this.formBuilder.group({
      dateRange: this.dateRangeForm
    });
  }

  onApplyFilter(){
    this.applyFilter.emit();
  }

  onCancelFilter(){
    this.cancelFilter.emit();
  }

  change(event: any){
    let endDate : Date = new Date();
    let startDate : Date = new Date();
    if(event.selected) {
      if(event.source.value == "WEEK") {
        startDate.setDate(endDate.getDate() - 7);
      }
      else if(event.source.value == "MONTHS") {
        startDate.setDate(endDate.getDate() - 31);
      }
      else if(event.source.value == "YEAR") {
        startDate.setDate(endDate.getDate() - 365);
      }

      this.startDateCtrl.setValue(startDate);
      this.endDateCtrl.setValue(endDate);
    }
  }
}
