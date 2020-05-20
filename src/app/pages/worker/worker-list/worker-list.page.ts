
// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// services
import { FarmlandService } from '../../../services/farmland/farmland.service';

// models
import { Farmland } from '../../../models/farmland.model';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.page.html',
  styleUrls: ['./worker-list.page.scss'],
})
export class WorkerListPage implements OnInit {
  farmlandSubscription: Subscription;
  farmland: Farmland ;

  constructor(
    private farmlandService: FarmlandService,
    private router: Router,
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.farmlandSubscription = this.farmlandService.activeFarmland.subscribe(farmland => {
      if( farmland ) {
        this.farmland = farmland;
      } else {
        console.log('entre aui');
        this.farmlandSubscription = this.farmlandService.farmlandFromStorage().subscribe( farmland => {
          this.farmland = farmland;
        });
      }
    });
  }

  ionViewWillLeave(){
    this.farmlandSubscription.unsubscribe();
  }

}
