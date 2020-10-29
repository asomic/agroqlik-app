// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';

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
export class WorkerDayService {
  private _workerDay: WorkerDay = null;
  private _workerDayList: WorkerDay[] = [];
  constructor(
    private authservice: AuthService,
    private http: HttpClient,
  ) { }

  fetchFarmlandWorkerDays() {
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          const url = auth.domain + '/farmlands/' + auth._farmland + '/workerdays?all=true';
          return this.http.get(url, auth.header ).pipe(map(
            response => {
              this._workerDayList = [];
              response['data'].forEach(element => {
                const workerDay = new WorkerDay(
                  element.id,
                  element.worker_id,
                  element.worker_name,
                  element.worker_rut_formated,
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
                    labor.production,
                    ​​​labor.bono_colacion,
                    ​​​labor.bono_transporte,
                    labor.bono_produccion,
                    labor.bono_otro,
                  );
                  workerLaborList.push(workerLabor);
                });
                workerDay.labors = workerLaborList;
                this._workerDayList.push(workerDay);
              });

              return this._workerDayList;
            },
            error => {
              console.log(error);
              return this._workerDayList;
            }
          ));
        }
      )
    );
  }

  fetchCostCenterWorkerDays(id: string) {
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          console.log('fetch costcenter workerDays');
          const url = auth.domain + '/farmlands/' + auth.farmland + '/costcenters/' + id + '/workerdays?all=true';
          return this.http.get(
            url,
            auth.header
            ).pipe( map (
              response => {
                this._workerDayList = [];
                response['data'].forEach(element => {
                  const workerDay = new WorkerDay(
                    element.id,
                    element.worker_id,
                    element.worker_name,
                    element.worker_rut_formated,
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
                      labor.production,
                      ​​​labor.bono_colacion,
                      ​​​labor.bono_transporte,
                      labor.bono_produccion,
                      labor.bono_otro,
                    );
                    workerLaborList.push(workerLabor);
                  });
                  workerDay.labors = workerLaborList;
                  this._workerDayList.push(workerDay);
                });

                return this._workerDayList;
              },
              error => {
                console.log(error);
                return this._workerDayList;
              })
            );
          }
      )
    );
  }

  getWorkerDay(id: string) {
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
            const url = auth.domain + '/farmlands/' + auth.farmland + '/workers/' + id + '/today';
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
                    element.worker_name,
                    element.worker_rut_formated,
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
                      labor.production,
                      ​​​labor.bono_colacion,
                      ​​​labor.bono_transporte,
                      labor.bono_produccion,
                      labor.bono_otro,
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
                    null,
                    null,
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

  absenceChange(id: string, absence: boolean) {
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          const data = {
            absence: absence,
          };
          const url = auth.domain + '/farmlands/' + auth.farmland + '/workers/' + id + '/absence';
          return this.http.post(
            url,
            data,
            auth.header
            ).pipe( map (
              response => {
                return response;
              },
              error => {
                return error;
              })
            );
          }
      )
    );
  }

}

