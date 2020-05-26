// angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';


// Service
import { CostCenterService } from '../../../services/farmland/costcenter.service';
import { WorkerDayService } from '../../../services/worker/workerday.service';

// Models
import { CostCenter } from '../../../models/costcenter.model';


@Component({
  selector: 'app-cost-center-show',
  templateUrl: './cost-center-show.page.html',
  styleUrls: ['./cost-center-show.page.scss'],
})

export class CostCenterShowPage implements OnInit {

  CostCenterSubscription: Subscription;
  workerDaysSubscription: Subscription;
  absenceSubscription: Subscription;
  costCenter: CostCenter ;
  workerDayList: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private costCenterService: CostCenterService,
    private workerDayService: WorkerDayService,
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
    let id = this.activatedRoute.snapshot.paramMap.get('costcenter');
    console.log(id);
    this.CostCenterSubscription = this.costCenterService.fetchCostCenter(id).subscribe(
      costCenter => {
        this.costCenter = costCenter;
        this.CostCenterSubscription.unsubscribe();
      }
    );
    this.workerDaysSubscription = this.costCenterService.fetchCostCenterWorkerDays(id).subscribe(
      workerDays => {
        console.log(workerDays);
        this.workerDayList = workerDays['data'];
        console.log(workerDays['data'][0].absence);
        this.workerDaysSubscription.unsubscribe();
      }
    );
  }

  absenceChange( event, id ) {
    this.workerDayService.abcenseChange(id, event).subscribe(
      response => {
        console.log(response);
      }
    );
  }

}
