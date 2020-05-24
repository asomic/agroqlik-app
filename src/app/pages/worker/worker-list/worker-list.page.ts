
// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// services
import { FarmlandService } from '../../../services/farmland/farmland.service';
import { WorkerService } from '../../../services/worker/worker.service';


// models
import { Farmland } from '../../../models/farmland.model';
import { WorkerDay } from '../../../models/workerday.model';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.page.html',
  styleUrls: ['./worker-list.page.scss'],
})
export class WorkerListPage implements OnInit {
  farmlandSubscription: Subscription;
  farmland: Farmland;
  workerDay: WorkerDay;
  workerDayList = [];


  constructor(
    private farmlandService: FarmlandService,
    private workerService: WorkerService,
    private router: Router,
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.workerService.fetchWorkerDayList().subscribe(workerDayList => {
      this.workerDayList = workerDayList['data'];
      console.log(this.workerDayList);
    });
    this.farmlandSubscription = this.farmlandService.activeFarmland.subscribe(farmland => {
      if ( farmland ) {
        this.farmland = farmland;
        // this.workerService.getWorkerDayList.subscribe(
        //   costCenterList => {
        //     this.costCenterList = costCenterList;
        //   }
        // );
      } else {
        this.router.navigateByUrl('/dashboard');
      }


    });
  }

  ionViewWillLeave() {
    this.farmlandSubscription.unsubscribe();
  }

}
