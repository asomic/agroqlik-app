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
  costCenter: CostCenter ;
  currentDate: Date;
  
  @ViewChild('myFarmlandSelect', { static: false }) selectRef: IonSelect;

  constructor(
    private authService: AuthService,
    private farmlandService: FarmlandService,
    private costCenterService: CostCenterService,
  ) { }
  


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

}
