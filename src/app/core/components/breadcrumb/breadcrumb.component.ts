import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent {

  @Input() title: string = "Titre de la page";
  @Input() links = [
      { title:"Home", link:"/" },
      { title:"Dashboard", link:"/dashboard" },
  ];

  isLaskLink(index:number): boolean {
    return index == this.links.length - 1;
  }
}
