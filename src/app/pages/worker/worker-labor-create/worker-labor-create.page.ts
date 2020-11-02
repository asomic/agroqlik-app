// Angular
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, from , of, Subscription } from 'rxjs';
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
    new LaborType(3, 'Hora extra'),
    new LaborType(4, 'Hora trabajada'),
  ];

  // Subscription 
  createLaborSubscription: Subscription;
  //workerDaysSubscription: Subscription;

  dataReturned: any;
  selectedLaborTotal = 0;
  LaborTypeOption = 0;
  loading: any;
  index: number;

  laborIndex: any = 0;
  quantityInput: any = 0;
  valueInput: any = 0;
  productionInput: any = 0;
  selectedLaborType: LaborType;
  selectedCostCenter: CostCenter;
  selectedLabor: Labor;

  bonos_open = false;
  colacionInput = 0;
  transporteInput = 0;
  produccionInput = 0;
  otroInput = 0;

  submitDisabled = true;

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
    this.selectedLaborTotal = this.quantityInput * this.valueInput +
    this.colacionInput + this.transporteInput + this.produccionInput + this.otroInput;
    if (this.selectedLaborTotal > 0) {
      this.submitDisabled = false;
    } else {
      this.submitDisabled = true;
    }
  }

  storeWorkerLabor(value) {
    console.log(value);
    const id = this.activatedRoute.snapshot.paramMap.get('worker');

    this.uploadLoading().then(() => {
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
        value.productionInput,
        value.colacionInput || 0,
        value.transporteInput || 0,
        value.produccionInput || 0,
        value.otroInput || 0,
      );
      console.log(workerLabor);
  
      this.createLaborSubscription = this.workerLaborService.createLabor(workerLabor).subscribe(
        response => {
          this.createLaborSubscription.unsubscribe();
          this.loading.dismiss();
          this.presentToast('Labor asignada con éxito');
          this.location.back();
        },
        error => {
          console.log(error);
          this.loading.dismiss();
        }
      );


    });
    // console.log(value);
    

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

  toggleBonos(event){
    this.bonos_open = event;
  }

}
