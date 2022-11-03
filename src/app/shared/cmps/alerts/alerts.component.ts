import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'alert',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  host: {
    style: 'width: 100%'
  },
  imports: [CommonModule]
})
export class AlertsComponent implements OnInit {

  @Input('type') type: string = 'error';
  @Input('full') full: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }
}

export interface Alert {
  show: boolean;
  type: "error" | "warning" | 'info' | "success" | "none";
  text: string;
}

export class alertMethods implements Alert {
  
  show: boolean = false;
  type: "error" | "warning" | 'info' | "success" | "none" = "none";
  text: string = "";

  hide() {
    this.type = 'none';
    this.text = '';
    this.show = false;
  };

  set(type: "error" | "warning" | 'info' | "success" | "none", text: string){
    this.type = type;
    this.text = text;
    this.show = true;
  }
}