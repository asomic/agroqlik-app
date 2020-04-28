import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSelect } from '@ionic/angular';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  hideList = true;
  
  @ViewChild('mySelect', { static: false }) selectRef: IonSelect;

  constructor() { }
  
  ngOnInit() {
  }

  openSelect() {
    // this.select1.open()
    this.selectRef.open()
  }

}
