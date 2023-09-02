import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  mainForm!: FormGroup;
  civility = ["Mr", "Mme", "Mlle", "Dr"];
  
  constructor(private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private router: Router){

  }
  ngOnInit(): void {
    this.initMainForm();
  }

  private initMainForm(): void{
    this.mainForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      civility: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
    });
  }

  onSubmitForm(){
  }

  onClose(){
    this.router.navigateByUrl('/users');
  }
}
