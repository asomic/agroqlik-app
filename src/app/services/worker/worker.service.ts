import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap , take} from 'rxjs/operators';
// Capacitor
import { Plugins } from '@capacitor/core';
// Services
import { AuthService } from '../../services/auth/auth.service';
// Models
import { Worker } from '../../models/worker.model';
import { WorkerDay } from '../../models/workerday.model';
import { WorkerLabor } from '../../models/workerlabor.model';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private _workerList: Worker[] = [];
  private _worker: Worker = null;
  private _workerDay: WorkerDay = null;
  status: boolean = true;

  constructor(
    private authservice: AuthService,
    private http: HttpClient,
  ) { }

  // farmland list
  getWorkerList() {
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          if (this.status) {
            console.log('conectado worker');
            const url = auth.domain + '/workers?all=true';
            return this.http.get(
              url,
              auth.header
              ).pipe(map( response => {
                  this._workerList = [];
                  response['data'].forEach(element => {
                    const worker = new Worker(
                      element.id,
                      element.name,
                      element.rut,
                      element.searchable,
                    );
                    this._workerList.push(worker);
                  });
                  //storing
                  this.storeWorkerList(this._workerList);
                  return this._workerList;
                }));
          } else {
            // offline
            return from(Plugins.Storage.get({ key: "workerList" })).pipe(map( storedWorkerList => {
              console.log(storedWorkerList.value);
              const workers = JSON.parse(storedWorkerList.value);
              this._workerList = workers;
              return this._workerList;
            }));
          }
        }
      )
    );
  }

  getWorker(id: string) {
    return this.authservice.auth.pipe(
      switchMap(
        auth => {

            const url = auth.domain + '/workers/' + id;
            return this.http.get(
              url,
              auth.header
              ).pipe(map( response => {
                  const element = response['data'];
                  const worker = new Worker(
                    element.id,
                    element.name,
                    element.rut,
                    element.searchable,
                  );
                  return worker;
                }));

        }
      )
    );
  }

  getWorkerDay(id: string) {
    return this.authservice.auth.pipe(
      switchMap(
        auth => {

            const url = auth.domain + '/workers/' + id + '/today';
            return this.http.get(
              url,
              auth.header
              ).pipe(map( response => {
                console.log(response['data']);
                if (response['data']) {
                  const element = response['data'];
                  const workerDay = new WorkerDay(
                    element.id,
                    element.worker_id,
                    element.farmland_id,
                    element.amount,
                    element.absence,
                    element.date,
                    null
                  );
                  let workerLaborList: WorkerLabor[] = [];

                  element.labors.forEach(labor => {
                    const workerLabor = new WorkerLabor(
                      labor.id,
                      labor.cost_center_id,
                      labor.cost_center_name,
                      labor.worker_id,
                      labor.worker_day_id,
                      labor.labor_id,
                      labor.labor_name,
                      labor.labor_type.id,
                      labor.labor_type.name,
                      labor.status,
                      labor.quantity,
                      labor.value,
                      labor.total,
                      labor.total_bonuses,
                    );
                    workerLaborList.push(workerLabor);
                  });

                  workerDay.labors = workerLaborList;
                  console.log(workerDay);
                  return workerDay;
                } else {
                  const workerDay = new WorkerDay(
                    null,
                    +id,
                    +auth._farmland,
                    '0',
                    false,
                    null,
                    null
                  );
                  return workerDay;
                }

                }));

        }
      )
    );
  }

  // Storage
  private storeWorkerList(workerList: Worker[]) {
    Plugins.Storage.set({ key: "workerList", value: JSON.stringify(workerList) });
  }


}
