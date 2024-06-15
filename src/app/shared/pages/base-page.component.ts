import { Component, inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";
import { FileService } from "src/app/core/services/file.service";
import { LogService } from "src/app/core/services/log.service";

@Component({
    selector: 'app-base-page',
    template:`<div></div>`,
    styles: [`div { background: pink; }`]
  })
export class BasePageComponent {
  protected logService = inject(LogService);
  protected authService = inject(AuthService);
  protected fileService = inject(FileService);

  currentUser!:any;

  constructor(protected router: Router, protected route: ActivatedRoute){}

  ngOnInit(): void {
    this.currentUser = this.authService.userProfil;
  }

  hasRole(roles: any):boolean{
    return roles.includes(this.currentUser.role)
  }
}