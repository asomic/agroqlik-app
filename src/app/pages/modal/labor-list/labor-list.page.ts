import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Labor } from 'src/app/models/labor.model';

@Component({
  selector: 'app-labor-list',
  templateUrl: './labor-list.page.html',
  styleUrls: ['./labor-list.page.scss'],
})
export class LaborListPage implements OnInit {


  labor: Labor;
  laborList: Labor[];
  laborListFiltered: Labor[];

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) { }

  ngOnInit() {
    this.labor = this.navParams.data.labor;
    this.laborList = this.navParams.data.laborList;
    this.laborListFiltered = this.navParams.data.laborList;
    console.table(this.labor);
    console.table(this.laborList);
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  onSearchChange(searchValue: string) {
    this.laborListFiltered = this.laborList.filter(item => item.name.includes(searchValue.toLowerCase()));
  }

  async laborClick(labor: Labor) {
    await this.modalController.dismiss(labor);
  }

  async dismissModal() {
    await this.modalController.dismiss(null);
  }

}
