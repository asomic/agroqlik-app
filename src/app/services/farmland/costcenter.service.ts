// Angular
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
import { CostCenter } from '../../models/costcenter.model';

@Injectable({
  providedIn: 'root'
})

export class CostCenterService {
  private _costCenterList: CostCenter[] = [];
  private _costCenter: CostCenter = null;
  status: boolean = true;
  //constructor
  constructor(
    private authservice: AuthService,
    private http: HttpClient,
  ) { }

  // farmland list
  getCostCenterList() {
    return this.authservice.auth.pipe(
      switchMap(
        auth => {
          if (this.status) {
            console.log('conectado farmland');
            const url = auth.domain + '/farmlands/' + auth.farmland + '/costcenters';
            return this.http.get(
              url,
              auth.header
              ).pipe(map( response => {
                  this._costCenterList = [];
                  response['data'].forEach(element => {
                    const costcenter = new CostCenter(
                      element.id,
                      element.name,
                      element.todaylabors,
                      element.todayworkerdays,
                    );
                    this._costCenterList.push(costcenter);
                  });
                  //storing
                  this.storeCostCenterList(this._costCenterList);
                  return this._costCenterList;
                }));
          } else {
            return from(Plugins.Storage.get({ key: "costCenterList" })).pipe(map( storedCostCenter => {
              console.log(storedCostCenter.value);
              const costcenters = JSON.parse(storedCostCenter.value);
              this._costCenterList = costcenters;
              return this._costCenterList;
            }));
          }
        }
      )
    );
  }


    // Storage
    private storeCostCenterList(costcenters: CostCenter[]) {
      Plugins.Storage.set({ key: "costCenterList", value: JSON.stringify(costcenters) });
    }
}
