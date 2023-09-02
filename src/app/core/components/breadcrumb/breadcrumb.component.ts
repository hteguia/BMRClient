import { state } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {


  breadcrumb$!: Observable<any>;

  constructor(private store: Store){}
  ngOnInit(): void {
    this.breadcrumb$ = this.store.select((state:any)=>state.root);
  }
}
