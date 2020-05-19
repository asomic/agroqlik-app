
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
  private _costCenterList = new BehaviorSubject<CostCenter[]>(null);
  private _costCenter: CostCenter = null;
  status: boolean = true;
  //constructor
  constructor(
    private authservice: AuthService,
    private http: HttpClient,
  ) { }

  public get costCenterList() {
    return this._costCenterList.asObservable().pipe(
      map(costCenterList => {
        if (costCenterList) {
          return costCenterList;
        } else {
          return null;
        }
    }));
  }

  // farmland list
  fetchCostCenterList() {
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
                  let costCenterList: CostCenter[] = [];
                  response['data'].forEach(element => {
                    const costcenter = new CostCenter(
                      element.id,
                      element.name,
                      element.todaylabors,
                      element.todayworkerdays,
                    );
                    costCenterList.push(costcenter);
                  });
                  //storing
                  this.storeCostCenterList(costCenterList);
                  this._costCenterList.next(costCenterList);
                  return costCenterList;
                }));
          } else {
            return from(Plugins.Storage.get({ key: "costCenterList" })).pipe(map( storedCostCenter => {
              console.log(storedCostCenter.value);
              const costcenters = JSON.parse(storedCostCenter.value);
              this._costCenterList.next(costcenters);
              return costcenters;
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
