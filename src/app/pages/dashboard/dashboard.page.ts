import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSelect } from '@ionic/angular';
import { map, tap , take} from 'rxjs/operators';
import { Subscription } from 'rxjs';

// services
import { AuthService } from '../../services/auth/auth.service';
import { FarmlandService } from '../../services/farmland/farmland.service';
import { CostCenterService } from '../../services/farmland/costcenter.service';

// models
import { Farmland } from '../../models/farmland.model';
import { CostCenter } from '../../models/costcenter.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  hideList = true;
  FarmlandListSubscription: Subscription;
  FarmlandSubscription: Subscription;
  CostCenterListSubscription: Subscription;

  farmlandList: Farmland[];
  farmland: Farmland ;
  costCenterList: CostCenter[];
  costCenterListFiltered: CostCenter[];

  costCenter: CostCenter ;
  currentDate: Date;

  hours = new Date().getHours();
  dayTime = "";
  
  @ViewChild('myFarmlandSelect', { static: false }) selectRef: IonSelect;

  constructor(
    private authService: AuthService,
    private farmlandService: FarmlandService,
    private costCenterService: CostCenterService,
  ) {
    if (this.hours >= 5 && this.hours < 12) {
      this.dayTime = "Buenos días";
    } else if (this.hours >= 12 && this.hours < 21) {
      this.dayTime = "Buenas Tardes";
    } else {
      this.dayTime = "Buenas Noches"
    }
  }
  


  ngOnInit() {

  }

  doRefresh(event) {
    this.ionViewWillEnter();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  ionViewWillEnter() {
    this.currentDate = new Date();
    // lista de fundos
    this.FarmlandListSubscription = this.farmlandService.getFarmlandList().subscribe(
      response => {
        this.farmlandList = response;
        this.FarmlandListSubscription.unsubscribe();

            //fundo activo 
        this.FarmlandSubscription = this.farmlandService.getFarmland().subscribe(
          response => {
            this.farmland = response;
            this.FarmlandSubscription.unsubscribe();
          }
        );

        this.CostCenterListSubscription = this.costCenterService.fetchCostCenterList().subscribe(
          response => {
            this.costCenterList = response;
            this.costCenterList = this.costCenterList.filter(item => item.todayWorkerDays > 0);
            this.costCenterListFiltered = this.costCenterList;
            this.CostCenterListSubscription.unsubscribe();
          }
        );
      }
    );

  }


  openFarmlandSelect() {
    this.selectRef.open();
  }

  onFarmlandSelect(event: any) {
    this.authService.setFarm(event.target.value);
    this.ionViewWillEnter();
  }

  onSearchChange(searchValue: string): void {  
    console.log(searchValue);
    this.costCenterListFiltered = this.costCenterList.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));
    console.log(this.costCenterListFiltered);
  }

}
