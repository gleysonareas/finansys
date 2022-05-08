import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fs-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public appName: string = 'FINAN$YS';

  constructor() { }

  ngOnInit(): void {
  }

}
