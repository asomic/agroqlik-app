import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

// Services
import { AuthService } from '../../services/auth/auth.service';
import { WorkerLabor } from '../../models/workerlabor.model';


@Injectable({
  providedIn: 'root'
})
export class WorkerLaborService {

  constructor(
    private authservice: AuthService,
    private http: HttpClient,
  ) { }


  updateLabor(workerLabor: WorkerLabor) {
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          const data = {
            id: workerLabor.id,
            cost_center: workerLabor.costCenter.id,
            cuadrilla: workerLabor.cuadrilla,
            labor: workerLabor.labor.id,
            labor_type: workerLabor.laborType.id,
            quantity: workerLabor.quantity,
            value: workerLabor.value,
            production: workerLabor.production,
            colacion: workerLabor.colacion || 0,
            transporte: workerLabor.transporte || 0,
            produccion: workerLabor.produccion || 0,
            otro: workerLabor.otro || 0,
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
            cuadrilla: workerLabor.cuadrilla,
            labor: workerLabor.labor.id,
            labor_type: workerLabor.laborType.id,
            quantity: workerLabor.quantity,
            value: workerLabor.value,
            production: workerLabor.production,
            farmland: auth._farmland,
            colacion: workerLabor.colacion,
            transporte: workerLabor.transporte,
            produccion: workerLabor.produccion,
            otro: workerLabor.otro
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
}
