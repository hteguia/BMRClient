import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuComponent } from './components/menu/menu.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ShellComponent } from './components/shell/shell.component';
import { AuthGuard } from "./guards/auth.guard";

@NgModule({
    declarations: [
     FooterComponent,
     HeaderComponent,
     NavbarComponent,
     MenuComponent,
     BreadcrumbComponent,
     ShellComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    exports:[
      HeaderComponent,
      FooterComponent,
      NavbarComponent,
      MenuComponent,
      BreadcrumbComponent,
      ShellComponent,
    ],
    providers: [
      AuthGuard
    ]
})

export class CoreModule { }