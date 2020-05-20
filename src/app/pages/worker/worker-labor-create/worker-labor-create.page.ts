// Angular
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, from , of } from 'rxjs';
import { Router, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

// Ionic
import { LoadingController } from '@ionic/angular';
// Service
import { LaborService } from './../../../services/labor/labor.service';
import { CostCenterService } from '../../../services/Farmland/costcenter.service';
import { WorkerService } from '../../../services/worker/worker.service';

// Models
import { Farmland } from './../../../models/farmland.model';
import { Worker } from '../../../models/worker.model';
import { WorkerDay } from '../../../models/workerday.model';
import { WorkerLabor } from '../../../models/workerlabor.model';
import { CostCenter } from '../../../models/costcenter.model';
import { Labor, LaborType } from './../../../models/labor.model';

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
    private workerService: WorkerService,
    private location: Location,

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

    this.workerService.createLabor(workerLabor).subscribe( response => {
      console.log(response);
      this.loading.dismiss();
      this.location.back();
    },
    error => {
      console.log(error);
      this.loading.dismiss();
    });

  }

}
