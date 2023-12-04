import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, filter, map, startWith, tap, pipe, delay } from 'rxjs';
import {count} from "sms-length";
import { requiredFileTypeValidator } from 'src/app/shared/validators/required-file-type.validator';
import { SmsService } from '../../services/sms.service';
import { SmsCostModel } from '../../models/sms-cost.model';
import { numbersValidator } from '../../validators/numbers.validator';
import { BreadcrumpService } from 'src/app/core/services/breadcrump.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

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
    private router: Router, 
    private smsService: SmsService, 
    private breadcrumpService: BreadcrumpService){

    }

    ngOnInit(): void {
      this.initFormControls();
      this.initMainForm();
      this.initFormObservables();
      this.breadcrumpService.setBreadcrump("Envoyer SMS", [
        { title:"Home", link:"/" }, 
        { title:"Envoyer SMS", link:"/" }
      ]);
  
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
}
