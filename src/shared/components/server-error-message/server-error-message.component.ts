import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'fs-server-error-message',
  templateUrl: './server-error-message.component.html',
  styleUrls: ['./server-error-message.component.css']
})
export class ServerErrorMessageComponent implements OnInit {

  @Input('server-error-messages')
  public serverErrorMessages: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
