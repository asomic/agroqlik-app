import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// services
import { WorkerService } from '../../../services/worker/worker.service';
// models
import { Worker } from '../../../models/worker.model';


@Component({
  selector: 'app-worker-find',
  templateUrl: './worker-find.page.html',
  styleUrls: ['./worker-find.page.scss'],
})
export class WorkerFindPage implements OnInit {
  WorkerListSubscription: Subscription;
  workerList: Worker[];
  workerListFiltered: Worker[];
  constructor(
    private workerService: WorkerService,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    // lista de fundos
    this.WorkerListSubscription = this.workerService.getWorkerList().subscribe(
      response => {
        this.workerList = response;
        this.workerListFiltered = response;
        this.WorkerListSubscription.unsubscribe();
      }
    );

  }

  // onChange('') {
  //   this.workerListFiltered = this.workerList.filter(item => item.searchable.includes(substring));
  // }

  onSearchChange(searchValue: string): void {  
    this.workerListFiltered = this.workerList.filter(item => item.searchable.includes(searchValue.toLowerCase()));
  }
}
