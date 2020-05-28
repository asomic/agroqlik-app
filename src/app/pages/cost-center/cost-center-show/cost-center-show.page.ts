// angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs';
// Ionic
import { ToastController  } from '@ionic/angular';
// Service
import { CostCenterService } from '../../../services/farmland/costcenter.service';
import { WorkerDayService } from '../../../services/worker/workerday.service';

// Models
import { CostCenter } from '../../../models/costcenter.model';
import { WorkerDay } from '../../../models/workerday.model';

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
  workerDayList: WorkerDay[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private costCenterService: CostCenterService,
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
        duration: 3000,
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
    let id = this.activatedRoute.snapshot.paramMap.get('costcenter');
    console.log(id);
    this.CostCenterSubscription = this.costCenterService.fetchCostCenter(id).subscribe(
      costCenter => {
        this.costCenter = costCenter;
        this.CostCenterSubscription.unsubscribe();
      }
    );
    this.workerDaysSubscription = this.workerDayService.fetchCostCenterWorkerDays(id).subscribe(
      workerDays => {
        this.workerDayList = workerDays;
        this.workerDaysSubscription.unsubscribe();
      }
    );
  }

  absenceChange( event, value, id, index ) {
    console.log(event);
    this.workerDayService.absenceChange(id, value).subscribe(
      response => {
        this.workerDayList[index].absence = response['absence'];
        if(response['absence']) {
          this.presentToast('Trabajador cambiado a Ausente');
        } else {
          this.presentToast('Trabajador cambiado a Presente');
        }
      }
    );
  }

}
