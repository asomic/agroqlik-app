
// Angular
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute} from '@angular/router';
import { FormsModule , FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// Ionic
import { LoadingController } from '@ionic/angular';
// Services
import { WorkerService } from '../../../services/worker/worker.service';
import { CostCenterService } from '../../../services/Farmland/costcenter.service';
import { LaborService } from './../../../services/labor/labor.service';

// Models
import { Farmland } from './../../../models/farmland.model';
import { Worker } from '../../../models/worker.model';
import { WorkerDay } from '../../../models/workerday.model';
import { WorkerLabor } from '../../../models/workerlabor.model';
import { CostCenter } from '../../../models/costcenter.model';
import { Labor, LaborType } from './../../../models/labor.model';

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
  // form Inputs
  laborIndex: any = 0;
  quantityInput: any = 0;
  valueInput: any = 0;
  selectedLaborType: LaborType;
  selectedCostCenter: CostCenter;
  selectedLabor: Labor;

  constructor(
    private activatedRoute: ActivatedRoute,
    private workerService: WorkerService,
    private costCenterService: CostCenterService,
    private laborService: LaborService,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController
  ) {}
  ngOnInit() {
    // this.myForm = this.formBuilder.group({
    //   player1: ['', Validators.required]
    // });

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
    // this.costCenterService.costCenterList.subscribe( costcenter =>{
    //   this.costCenterList = costcenter;
    // });
  }

  // loading
  async  uploadLoading() {
    this.loading = await this.loadingController.create({
      message: 'Actualizando...'
    });
    await this.loading.present();
  }

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

    this.workerDaySubscription = this.workerService.getWorkerDay(id).subscribe(
      response => {
        this.workerDay = response;
        this.workerlaborList = response.labors;

        console.log('listaaa ahora');
        console.log(this.workerlaborList);
        this.workerDaySubscription.unsubscribe();
      }
    );


    // this.laborListSubscription = this.laborService.fetchLaborList().subscribe(
    //   response => {
    //     this.laborList = response;
    //     this.laborListSubscription.unsubscribe();
    //   }
    // );

    // this.laborService.laborList.subscribe(result => {
    //   this.laborList = result;
    // });


  }

  // methods 

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
    this.selectedLaborTotal = this.quantityInput * this.valueInput;

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
    workerLabor.total = value.valueInput*value.quantityInput;
    console.log(workerLabor);
    this.workerService.updateLabor(workerLabor).subscribe( response => {
      console.log(response);
      this.showCollapsible[this.index] = false;
      this.showEdit[this.index] = !this.showEdit[this.index];
      this.showClose[this.index] = !this.showClose[this.index];
      this.loading.dismiss();

    },
    error => {
      this.loading.dismiss();
    });

  }

  laborTypeChange() {

    console.log(this.selectedLaborType);
    this.LaborTypeOption = this.selectedLaborType.id;
  }

  valueChange() {
    this.selectedLaborTotal = this.quantityInput * this.valueInput;
  }


}
