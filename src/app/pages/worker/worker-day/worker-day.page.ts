// Angular
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute} from '@angular/router';
// Services
import { WorkerService } from '../../../services/worker/worker.service';
// Models
import { Worker } from '../../../models/worker.model';
import { WorkerDay } from '../../../models/workerday.model';

@Component({
  selector: 'app-worker-day',
  templateUrl: './worker-day.page.html',
  styleUrls: ['./worker-day.page.scss'],
})
export class WorkerDayPage implements OnInit {
  workerSubscription: Subscription;
  workerDaySubscription: Subscription;
  public worker: Worker = null;
  public workerDay: WorkerDay = null;
  public activities = [
    {
      nombre: 'Poda',
      cuartel: 'Cuartel Fruta',
      tipoLabor: 'Trato',
      cantidadLabor: 1,
      bonos: [
        {
          tipo: 'Bono 1',
          valor: 2000
        }
      ]
    },
    {
      nombre: 'Podita',
      cuartel: 'Cuartel Fruta',
      tipoLabor: 'Trato',
      cantidadLabor: 1,
      bonos: [
        {
          tipo: 'Bono 1',
          valor: 2000
        },
        {
          tipo: 'Bono 2',
          valor: 4500
        }
      ]
    }
  ];

  showCollapsible: Array<boolean> = [];
  showEdit: Array<boolean> = [];
  showClose: Array<boolean> = [];

  toggleText = true;
  buttonText = 'Editar';

  constructor(
    private activatedRoute: ActivatedRoute,
    private workerService: WorkerService,
  ) {}
  ngOnInit() {}


  //ionic lifeCicle
  ionViewWillEnter() {
    let id = this.activatedRoute.snapshot.paramMap.get('worker');

    this.workerSubscription = this.workerService.getWorker(id).subscribe(
      response => {
        console.log(response);
        this.worker = response;
        this.workerSubscription.unsubscribe();
      }
    );

    this.workerDaySubscription = this.workerService.getWorkerDay(id).subscribe(
      response => {
        console.log(response);
        this.workerDay = response;
        this.workerDaySubscription.unsubscribe();
      }
    );

  }

  // methods 

  toggleCollapsible(i) {
    this.showCollapsible[i] = !this.showCollapsible[i];
    this.showEdit[i] = !this.showEdit[i];
    this.showClose[i] = !this.showClose[i];
  }



}
