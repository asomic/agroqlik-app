// Angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';

// Services
import { AuthService } from '../../services/auth/auth.service';
// Models
import { Worker } from '../../models/worker.model';
import { WorkerDay } from '../../models/workerday.model';
@Injectable({
  providedIn: 'root'
})
export class WorkerDayService {

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

  abcenseChange(id: string, absence: boolean) {
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          console.log('fetch costcenter workerDays');
          const data = {
            absence: absence,
          };
          const url = auth.domain + '/farmlands/' + auth.farmland + '/workerdays/' + id + '/absence';
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

