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
import { CostCenter } from 'src/app/models/costcenter.model';
import { Labor, LaborType } from 'src/app/models/labor.model';

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
                      element.rut_formated,
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
                    element.rut_formated,
                    element.searchable,
                  );
                  return worker;
                }));

        }
      )
    );
  }

  fetchWorkerDayList() {
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          const url = auth.domain + '/farmlands/' + auth._farmland + '/workerdays?all=true';
          return this.http.get(url, auth.header ).pipe(map(
            response => {
              return response;
            },
            error => {
              return error;
            }
          ));
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
                      labor.worker_id,
                      labor.worker_day_id,
                      labor.status,
                      new CostCenter(labor.cost_center.id, labor.cost_center.name),
                      new Labor(labor.labor.id, labor.labor.name),
                      new LaborType(labor.labor_type.id, labor.labor_type.text),
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

  updateLabor(workerLabor: WorkerLabor) {
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          const data = {
            id: workerLabor.id,
            cost_center: workerLabor.costCenter.id,
            labor: workerLabor.labor.id,
            labor_type: workerLabor.laborType.id,
            quantity: workerLabor.quantity,
            value: workerLabor.value,
          };

          const url = auth.domain + '/workers/' + workerLabor.workerId + '/workerlabors/' + workerLabor.id;
          return this.http.post(
            url,
            data,
            auth._header
          );
        }
      )
    );
  }

  createLabor(workerLabor: WorkerLabor) {
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          const data = {
            worker: workerLabor.workerId,
            cost_center: workerLabor.costCenter.id,
            labor: workerLabor.labor.id,
            labor_type: workerLabor.laborType.id,
            quantity: workerLabor.quantity,
            value: workerLabor.value,
            farmland: auth._farmland
          };

          const url = auth.domain + '/workers/' + workerLabor.workerId + '/workerlabors';
          return this.http.post(
            url,
            data,
            auth._header
          );
        }
      )
    );
  }
  deleteLabor(workerLabor: WorkerLabor) {
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          const data = {
            method: 'delete',
          };
          const url = auth.domain + '/workers/' + workerLabor.workerId + '/workerlabors/' + workerLabor.id;
          return this.http.delete(
            url,
            auth._header
          );
        }
      )
    );
  }
  // Storage
  private storeWorkerList(workerList: Worker[]) {
    Plugins.Storage.set({ key: "workerList", value: JSON.stringify(workerList) });
  }


}
