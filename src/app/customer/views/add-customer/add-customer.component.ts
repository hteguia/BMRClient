import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit{

  

  mainForm!: FormGroup;
  loading = false; 

  constructor(private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router){

}
  ngOnInit(): void {
    this.initMainForm();
  }

  private resetForm(){
    this.mainForm.reset();
  }
  
  onSubmitForm(){
    this.loading = true;
    this.customerService.saveCustomer(this.mainForm.value).pipe(
      tap(saved => {
        this.loading = false;
        if(saved){
           this.resetForm();
        }
        else{
          console.error('Echec de l\'enregistrement');
        }
      })
    ).subscribe();
 
  }

  private initMainForm(): void{
    this.mainForm = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.required),
      phoneNumber: this.formBuilder.control('', Validators.required),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      webSite:this.formBuilder.control(''),
    });
  }

  onClose(){
    this.router.navigateByUrl('/customers');
  }
}
