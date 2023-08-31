import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from '../../services/role.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  mainForm!: FormGroup;
  loading = false;
  
  constructor(private route: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private router: Router,
    private rolesService: RolesService){

  }
  ngOnInit(): void {
    this.initMainForm();
  }

  private initMainForm(): void{
    this.mainForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmitForm(){
    this.loading = true;
    this.rolesService.saveRole(this.mainForm.value).pipe(
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

  private resetForm(){
    this.mainForm.reset();
  }

  onClose(){
    this.router.navigateByUrl('/roles');
  }
}
