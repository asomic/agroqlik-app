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

@Injectable({
  providedIn: 'root'
})
export class WorkerService {
  private _workerList: Worker[] = [];
  private _worker: Worker = null;
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
            const url = auth.domain + '/workers/';
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


    // Storage
    private storeWorkerList(workerList: Worker[]) {
      Plugins.Storage.set({ key: "workerList", value: JSON.stringify(workerList) });
    }


}
