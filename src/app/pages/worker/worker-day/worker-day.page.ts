
// Angular
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute} from '@angular/router';
import { FormsModule , FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// Ionic
import { LoadingController, AlertController, ModalController, ToastController  } from '@ionic/angular';
// Services
import { WorkerService } from '../../../services/worker/worker.service';
import { WorkerDayService } from '../../../services/worker/workerday.service';
import { WorkerLaborService } from '../../../services/worker/workerlabor.service';
import { CostCenterService } from '../../../services/farmland/costcenter.service';
import { LaborService } from './../../../services/labor/labor.service';

// Models
import { Worker } from '../../../models/worker.model';
import { WorkerDay } from '../../../models/workerday.model';
import { WorkerLabor } from '../../../models/workerlabor.model';
import { CostCenter } from '../../../models/costcenter.model';
import { Labor, LaborType } from './../../../models/labor.model';

// Modal
import { LaborListPage } from '../../modal/labor-list/labor-list.page';

@Component({
  selector: 'app-worker-day',
  templateUrl: './worker-day.page.html',
  styleUrls: ['./worker-day.page.scss'],
})
export class WorkerDayPage implements OnInit {
  workerSubscription: Subscription;
  workerDaySubscription: Subscription;
  costCenterListSubscription: Subscription;
  laborListSubscription: Subscription;
  deleteWorkerLaborSubscription: Subscription;

  public myForm: FormGroup;

  public worker: Worker = null;
  public workerDay: WorkerDay = null;
  public workerlaborList: WorkerLabor[] = [];
  public costCenterList: CostCenter[] = [];
  public laborList: Labor[] = [];
  public laborListFiltered: Labor[] = [];
  public laborTypeList: LaborType[] = [
    new LaborType(1, 'Jornada'),
    new LaborType(2, 'Trato'),
    new LaborType(3, 'Hora extra')
  ];
  dataReturned: any;
  showCollapsible: Array<boolean> = [];
  showEdit: Array<boolean> = [];
  showClose: Array<boolean> = [];
  showFooter = false;
  isLaborLoaded = false;
  laborOpen = false;
  toggleText = true;
  buttonText = 'Editar';
  selectedLaborTotal = 0;
  LaborTypeOption = 0;
  loading: any;
  index: number;
  bonos_open = false;
  // form Inputs
  laborIndex: any = 0;
  quantityInput: any = 0;
  valueInput: any = 0;
  selectedLaborType: LaborType;
  selectedCostCenter: CostCenter;
  selectedLabor: Labor;

  colacionInput = 0;
  transporteInput = 0;
  produccionInput = 0;
  otroInput = 0;


  constructor(
    private activatedRoute: ActivatedRoute,
    private workerService: WorkerService,
    private workerDayService: WorkerDayService,
    private workerLaborService: WorkerLaborService,
    private costCenterService: CostCenterService,
    private laborService: LaborService,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    public alertController: AlertController,
    public modalController: ModalController,
    public toastController: ToastController
  ) {}
  ngOnInit() {
    this.laborListSubscription = this.laborService.fetchLaborList().subscribe(
      response => {
        this.laborList = response;
        this.laborListSubscription.unsubscribe();
      }
    );
    this.costCenterListSubscription = this.costCenterService.fetchCostCenterList().subscribe(
      response => {
        this.costCenterList = response;
        this.costCenterListSubscription.unsubscribe();
      }
    );
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


  // loading
  async uploadLoading() {
    this.loading = await this.loadingController.create({
      message: 'Actualizando...'
    });
    await this.loading.present();
  }

  // Alert


  // Refresh
  doRefresh(event) {
    console.log('Begin async operation');
    this.ionViewWillEnter();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  // Ionic lifeCicle
  ionViewWillEnter() {

    let id = this.activatedRoute.snapshot.paramMap.get('worker');

    this.workerSubscription = this.workerService.getWorker(id).subscribe(
      response => {
        this.worker = response;
        this.workerSubscription.unsubscribe();
      }
    );

    this.workerDaySubscription = this.workerDayService.getWorkerDay(id).subscribe(
      response => {
        this.workerDay = response;
        this.workerlaborList = response.labors;
        this.workerDaySubscription.unsubscribe();
      }
    );

  }

  toggleBonos(event){
    this.bonos_open = event;
  }

  toggleCollapsible(i) {
    this.index = i;
    // switchi
    if(this.showCollapsible[i] === true ){
      this.showCollapsible.forEach((element, index)  => {
        this.showCollapsible[index] = false;
      });
      this.showFooter = false;
    } else {
      this.showCollapsible.forEach((element, index)  => {
        this.showCollapsible[index] = false;
      });
      this.showCollapsible[i] = true;
      this.showFooter = true;
    }

    this.showEdit[i] = !this.showEdit[i];
    this.showClose[i] = !this.showClose[i];
    this.quantityInput = this.workerlaborList[i].quantity;
    this.valueInput = this.workerlaborList[i].value;
    this.colacionInput = this.workerlaborList[i].colacion;
    this.transporteInput = this.workerlaborList[i].transporte;
    this.produccionInput = this.workerlaborList[i].produccion;
    this.otroInput = this.workerlaborList[i].otro;

    let bonos =  this.colacionInput  + this.transporteInput  + this.produccionInput  + this.otroInput ;
    if(bonos > 0) {
      this.bonos_open = true;
    } else {
      this.bonos_open = false;
    }
    
    this.selectedLaborTotal = this.quantityInput * this.valueInput + bonos;

    let workerLabor = this.workerlaborList[i];

    this.laborIndex = i;
    this.selectedCostCenter = this.workerlaborList[i].costCenter;

    this.selectedLaborType = this.laborTypeList.filter(laborType => {
      if(laborType.id == this.workerlaborList[i].laborType.id) {
        this.LaborTypeOption = this.workerlaborList[i].laborType.id;
        return true;
      }
    })[0];

    this.selectedCostCenter = this.costCenterList.filter(costCenter => {
      if(costCenter.id == this.workerlaborList[i].costCenter.id) {
        return true;
      }
    })[0];

    this.selectedLabor = this.laborList.filter(labor => {
      if(labor.id == this.workerlaborList[i].labor.id) {
        return true;
      }
    })[0];
  }

  laborFilterList(event) {
    console.log(event.srcElement.value);
    const searchTerm = event.srcElement.value;
    this.laborListFiltered = this.laborList.filter(labor => {
      if (labor.name && searchTerm) {
        if (labor.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          this.isLaborLoaded = true;
          return true;
        }
        return false;
      }
    }).slice(0, 5);
  }

  laborChange(event) {
    console.log(event);
  }

  updateWorkerLabor(value) {
    this.uploadLoading();
    console.log(value);
    let workerLabor = this.workerlaborList[value.indexInput];
    workerLabor.costCenter = value.costCenterInput;
    workerLabor.labor = value.laborInput;
    workerLabor.laborType = value.laborTypeInput;
    workerLabor.value = value.valueInput;
    workerLabor.quantity = value.quantityInput;
    workerLabor.colacion = value.colacionInput;
    workerLabor.transporte = value.transporteInput;
    workerLabor.produccion = value.produccionInput;
    workerLabor.otro = value.otroInput;
    workerLabor.total = value.valueInput * value.quantityInput +
     value.colacionInput + value.transporteInput + value.produccionInput + value.otroInput;

    this.workerLaborService.updateLabor(workerLabor).subscribe( response => {
      console.log(response);
      this.showCollapsible[this.index] = false;
      this.showEdit[this.index] = !this.showEdit[this.index];
      this.showClose[this.index] = !this.showClose[this.index];
      this.showFooter = false;
      this.loading.dismiss();
      this.presentToast('Labor modificada con éxito');
    },
    error => {
      this.loading.dismiss();
    });

  }


  async deleteWorkerLabor(workerLabor: WorkerLabor, i: number) {
    const alert = await this.alertController.create({
      header: 'Eliminar',
      message: '¿Está seguro que desea eliminar la labor?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('canceled');
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteWorkerLaborSubscription = this.workerLaborService.deleteLabor(workerLabor).subscribe(
              response => {
                this.workerlaborList = this.workerlaborList.filter(({ id }) => id !== workerLabor.id);
                this.deleteWorkerLaborSubscription.unsubscribe();
                this.presentToast('Labor eliminada con éxito');
              }, error => {
                console.log(error);
                this.deleteWorkerLaborSubscription.unsubscribe();
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  laborTypeChange() {
    console.log(this.selectedLaborType);
    this.LaborTypeOption = this.selectedLaborType.id;
  }

  valueChange() {
    this.selectedLaborTotal = this.quantityInput * this.valueInput + this.colacionInput + this.transporteInput + this.produccionInput + this.otroInput;
  }

  // laborModal(labor: Labor) {
  //   console.log(labor);
  // }
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
  //  ausente
  absenceChange( event, value, id ) {
    console.log(event);
    this.workerDayService.absenceChange(id, value).subscribe(
      response => {
        // console.log('evento');
        // console.log(event);
        // console.log('respuesta');
        // console.log(response);
        this.workerDay.absence = response['absence'];
        if(response['absence']) {
          this.presentToast('Trabajador cambiado a Ausente');
        } else {
          this.presentToast('Trabajador cambiado a Presente');
        }
        
      }
    );
  }

}
