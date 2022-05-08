import { Component, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fs-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit {

  @Input()
  public items: Array<BreadCrumbItem> = [];

  constructor() { }

  public ngOnInit(): void {
  }

  public isThelastItem(item: BreadCrumbItem): boolean {
    const index = this.items.indexOf(item);
    return index + 1 == this.items.length;
  }

}

interface BreadCrumbItem {
  text: string;
  link?: string;
}