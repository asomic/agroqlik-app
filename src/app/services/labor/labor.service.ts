// angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { map, tap , take} from 'rxjs/operators';
// capacitor
import { Plugins } from '@capacitor/core';
const { Network } = Plugins;
// services
import { AuthService } from '../../services/auth/auth.service';
// models
import { Farmland } from '../../models/farmland.model';
import { Labor } from '../../models/labor.model';

@Injectable({
  providedIn: 'root'
})
export class LaborService {
  private _labors = new BehaviorSubject<Labor[]>(null);

  status = true;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) { }

    // get de las labores
    public get laborList() {
      return this._labors.asObservable().pipe(
        map(labors => {
          if (labors) {
            return labors;
          } else {
            return null;
          }
        })
      );
    }
  // Traemos todos las labores  
  fetchLaborList() {
    return this.authService.auth.pipe(
      switchMap(
        auth => {
          if (this.status) {
            console.log('conectado worker');
            const url = auth.domain + '/labors?all=true';
            return this.http.get(
              url,
              auth.header
              ).pipe(map( response => {
                  let laborList: Labor[] = [];

                  response['data'].forEach(element => {
                    const labor = new Labor(
                      element.id,
                      element.name,
                    );
                    laborList.push(labor);
                  });
                  //storing
                  this.storeLaborList(laborList);
                  this._labors.next(laborList);
                  return laborList;
                }));
          }
        }));
  }

    // Storage
    private storeLaborList(LaborList: Labor[]) {
      Plugins.Storage.set({ key: "laborList", value: JSON.stringify(LaborList) });
    }
}
