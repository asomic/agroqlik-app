
// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// services
import { FarmlandService } from '../../../services/farmland/farmland.service';
import { WorkerService } from '../../../services/worker/worker.service';
import { WorkerDayService } from '../../../services/worker/workerday.service';



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
    private workerDayService: WorkerDayService,
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.workerService.fetchWorkerDayList().subscribe(workerDayList => {
      this.workerDayList = workerDayList['data'];
      this.sortBy('ASC');
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

  absenceChange( event, id ) {
    this.workerDayService.abcenseChange(id, event).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  ionViewWillLeave() {
    this.farmlandSubscription.unsubscribe();
  }

  sortBy(sort: string) {
    if(sort == 'ASC') {
      this.workerDayList.sort((a, b) => {
        if (a.worker_name < b.worker_name)  {
          return -1;
        }
        if (a.worker_name > b.worker_name) {
          return 1;
        }
        // a debe ser igual b
        return 0;
      });
    } else {
      this.workerDayList.sort((a, b) => {
        if (a.worker_name < b.worker_name)  {
          return 1;
        }
        if (a.worker_name > b.worker_name) {
          return -1;
        }
        // a debe ser igual b
        return 0;
      });
    }


  }

}
