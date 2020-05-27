// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// Ionic
import { ToastController  } from '@ionic/angular';
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
  workerDayList: WorkerDay[] = [];
  currentDate: Date;

  constructor(
    private farmlandService: FarmlandService,
    private workerService: WorkerService,
    private router: Router,
    private workerDayService: WorkerDayService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    
  }
  doRefresh(event) {
    this.ionViewWillEnter();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  // Toast
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 5000,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  ionViewWillEnter() {
    this.currentDate = new Date();

    this.workerDayService.fetchFarmlandWorkerDays().subscribe(
      workerDayList => {
        this.workerDayList = workerDayList;
        this.sortBy('ASC');
        console.log(this.workerDayList);
      }
    );
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

  absenceChange( event, value, id, index ) {
    console.log(event);
    this.workerDayService.absenceChange(id, value).subscribe(
      response => {
        this.workerDayList[index].absence = response['absence'];
        if(response['absence']) {
          this.presentToast('Trabajador cambiado a ausente');
        } else {
          this.presentToast('Trabajador cambiado a presente');
        }
      }
    );
  }

  ionViewWillLeave() {
    this.farmlandSubscription.unsubscribe();
  }

  sortBy(sort: string) {
    if(sort == 'ASC') {
      this.workerDayList.sort((a, b) => {
        if (a.workerName < b.workerName)  {
          return -1;
        }
        if (a.workerName > b.workerName) {
          return 1;
        }
        // a debe ser igual b
        return 0;
      });
    } else {
      this.workerDayList.sort((a, b) => {
        if (a.workerName < b.workerName)  {
          return 1;
        }
        if (a.workerName > b.workerName) {
          return -1;
        }
        // a debe ser igual b
        return 0;
      });
    }


  }

}
