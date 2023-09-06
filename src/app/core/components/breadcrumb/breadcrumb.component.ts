
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {


  breadcrumb$!: Observable<any>;

  constructor(private store: Store<any>){}
  ngOnInit(): void {
    this.breadcrumb$ = this.store.pipe(select((state:any)=>state.root));
  }
}
