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
import { AuthGuard } from "./guards/auth.guard";
import { LayoutComponent } from "./components/layout/layout.component";
import { BreadcrumpService } from "./services/breadcrump.service";
import { LogService } from "./services/log.service";
import { StorageService } from "./services/storage.service";
import { FileService } from "./services/file.service";

@NgModule({
    declarations: [
     FooterComponent,
     HeaderComponent,
     NavbarComponent,
     MenuComponent,
     BreadcrumbComponent,
     LayoutComponent,
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
      LayoutComponent
    ],
    providers: [
      AuthGuard,
      BreadcrumpService,
      LogService,StorageService, FileService
    ]
    
})

export class CoreModule { }