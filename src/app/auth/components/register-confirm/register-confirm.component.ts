import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { delay, tap } from 'rxjs';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.css']
})
export class RegisterConfirmComponent implements OnInit {

  token!: string;
  uerId!: string;
  loading = false;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token')!;
    this.uerId = this.route.snapshot.queryParamMap.get('userId')!;
   if(this.token && this.uerId){
      this.confirmAccount();
    }
  }

  confirmAccount(){
    this.loading = true;
    this.auth.confirmRegister(this.uerId, this.token).pipe(
      tap(saved => {
        this.loading = false;
      })
    ).subscribe();
 
  }

  OnLogin(){
    this.router.navigateByUrl('/auth/login');
  }

}
