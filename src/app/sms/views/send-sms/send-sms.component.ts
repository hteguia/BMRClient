import { HttpClient, HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, filter, map, startWith, tap, pipe, delay } from 'rxjs';
import {count} from "sms-length";
import { requiredFileTypeValidator } from 'src/app/shared/validators/required-file-type.validator';
import { SmsService } from '../../services/sms.service';
import { SmsCostModel } from '../../models/sms-cost.model';
import { numbersValidator } from '../../validators/numbers.validator';
import { Store } from '@ngrx/store';
import { changeBreadcrump } from 'src/app/state/root-action';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.css']
})
export class SendSmsComponent implements OnInit{
  senderNames = [
    { name:"BMR-AFRICA", code:"BMR-AFRICA" },
    { name:"MPA", code:"MPA" }
  ]

  displayedColumns: string[] = ['position', 'name'];
  mainForm!: FormGroup;
  loading = false; 
  messageCounter$!: Observable<number>
  characterCounter$!: Observable<number>;
  messageCtrl!: FormControl;
  contentFileCtrl!: FormControl;
  numbersCtrl!: FormControl;

  smsCost$!: Observable<SmsCostModel>;
  costLoading = false;

  messageLength = 5;
  extension = ['csv']

  constructor(private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private router: Router, private smsService: SmsService, private store: Store){

    }

    ngOnInit(): void {
      this.initFormControls();
      this.initMainForm();
      this.initFormObservables();
      this.setBreadcrump();
    }
 
    initMainForm(){
      this.contentFileCtrl = this.formBuilder.control(null, [Validators.required, requiredFileTypeValidator(this.extension)]);
      this.numbersCtrl = this.formBuilder.control(null, numbersValidator());
      this.mainForm = this.formBuilder.group({
        campagneTitle: this.formBuilder.control('', Validators.required),
        senderName: this.formBuilder.control('', Validators.required),
        message: this.messageCtrl,
        sendDate:this.formBuilder.control(''),
        numbers:this.numbersCtrl
      });
    }

    private initFormControls(): void {
      this.messageCtrl = this.formBuilder.control('');
    }

    private initFormObservables() {
      this.characterCounter$ = this.messageCtrl.valueChanges.pipe(
        startWith(this.messageCtrl.value),  
        map((preference:string) => count(preference).length),    
      );

      this.messageCounter$ = this.messageCtrl.valueChanges.pipe(
        startWith(this.messageCtrl.value),  
        map((preference:string) => count(preference).messages),    
      );

     this.numbersCtrl.valueChanges.pipe(
          map((value:string)=>this.calculateDetailsNumbers(value))
      ).subscribe();
    }

    calculateDetailsNumbers(value:string){  
      this.contentFileCtrl.reset();
      this.contentFileCtrl.valueChanges.subscribe();
      let numbers = value.split(",");
      if(numbers.length && numbers.every(el => typeof el === 'number')){

      }
    

      return {
        totalNumber: value.split(",").length, 
        validNumber: 10,
        invalidNumber: 0,
        cost: 90 
      }
    }

    onSubmitForm(){
    
    }

    calculateCost(event: any){
      this.costLoading = true;
      this.smsCost$ = this.smsService.getSmsCost().pipe(
        delay(10000),
        map(c=> c),
        tap(()=>this.costLoading = false)
      )
    }
    private setBreadcrump():void{
      this.store.dispatch(changeBreadcrump(
        {
          title: "Envoyer SMS", 
          links:[
            { title:"Home", link:"/" }, 
            { title:"Envoyer SMS", link:"/" }
          ]
        }));
    }
}
