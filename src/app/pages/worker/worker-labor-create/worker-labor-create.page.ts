// Angular
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, from , of } from 'rxjs';
import { Router, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

// Ionic
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
// Service
import { LaborService } from './../../../services/labor/labor.service';
import { CostCenterService } from '../../../services/farmland/costcenter.service';
import { WorkerService } from '../../../services/worker/worker.service';
import { WorkerLaborService } from '../../../services/worker/workerlabor.service';


// Models
import { WorkerLabor } from '../../../models/workerlabor.model';
import { CostCenter } from '../../../models/costcenter.model';
import { Labor, LaborType } from './../../../models/labor.model';

// Modal
import { LaborListPage } from '../../modal/labor-list/labor-list.page';

@Component({
  selector: 'app-worker-labor-create',
  templateUrl: './worker-labor-create.page.html',
  styleUrls: ['./worker-labor-create.page.scss'],
})
export class WorkerLaborCreatePage implements OnInit {
  public costCenterList: CostCenter[] = [];
  public laborList: Labor[] = [];
  public laborListFiltered: Labor[] = [];
  public laborTypeList: LaborType[] = [
    new LaborType(1, 'Jornada'),
    new LaborType(2, 'Trato'),
    new LaborType(3, 'Hora extra')
  ];
  dataReturned: any;
  selectedLaborTotal = 0;
  LaborTypeOption = 0;
  loading: any;
  index: number;

  laborIndex: any = 0;
  quantityInput: any = 0;
  valueInput: any = 0;
  selectedLaborType: LaborType;
  selectedCostCenter: CostCenter;
  selectedLabor: Labor;


  constructor(
    private activatedRoute: ActivatedRoute,
    private laborService: LaborService,
    private costCenterService: CostCenterService,
    public loadingController: LoadingController,
    private workerLaborService: WorkerLaborService,
    private location: Location,
    public modalController: ModalController,
    public toastController: ToastController

    ) { }

  // loading
  async  uploadLoading() {
    this.loading = await this.loadingController.create({
      message: 'Actualizando...'
    });
    await this.loading.present();
  }

  ngOnInit() {
    this.laborService.laborList.subscribe( labor =>{
      this.laborList = labor;
    });
    this.costCenterService.costCenterList.subscribe( costcenter =>{
      this.costCenterList = costcenter;
    });
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

  laborTypeChange() {
    this.LaborTypeOption = this.selectedLaborType.id;
  }

  valueChange() {
    this.selectedLaborTotal = this.quantityInput * this.valueInput;
  }

  storeWorkerLabor(value) {
    console.log(value);
    const id = this.activatedRoute.snapshot.paramMap.get('worker');

    this.uploadLoading();
    // console.log(value);
    const workerLabor = new WorkerLabor(
      null,
      Number(id),
      null,
      1,
      value.costCenterInput,
      value.laborInput,
      value.laborTypeInput,
      value.quantityInput,
      value.valueInput,
      value.valueInput * value.quantityInput,
      0
    );
    console.log(workerLabor);

    this.workerLaborService.createLabor(workerLabor).subscribe(
      response => {

        this.loading.dismiss();
        this.presentToast('Labor asignada con éxito');
        this.location.back();
      },
      error => {
        console.log(error);
        this.loading.dismiss();
      }
    );

  }

  async laborModal(labor: Labor) {
    const modal = await this.modalController.create({
      component: LaborListPage,
      componentProps: {
        "labor": labor,
        "laborList": this.laborList
      }
    });

    modal.onDidDismiss().then((dataReturned ) => {
      if (dataReturned !== null) {
        console.log('cerre');
        console.log(dataReturned);
        this.selectedLabor = dataReturned.data;
      }
    });

    return await modal.present();
  }

}
