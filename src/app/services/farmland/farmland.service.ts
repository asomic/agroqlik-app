
// angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap , take} from 'rxjs/operators';
// capacitor
import { Plugins } from '@capacitor/core';
const { Network } = Plugins;
// services
import { AuthService } from '../../services/auth/auth.service';
// models
import { Farmland } from '../../models/farmland.model';

@Injectable({
  providedIn: 'root'
})

export class FarmlandService {
  private _farmlandList: Farmland[] = [];
  private _farmland: Farmland = null;
  private _activeFarmland = new BehaviorSubject<Farmland>(null);
  listener: any;
  status: boolean;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
  ) {
    Network.getStatus().then( response => {
      this.status = response.connected;
      //console.log('conectado:' + this.status);
    });

    this.startListenNetwork();


  }
  // public setFarmland(id:number ) {

  // }

  public  get activeFarmland() {
    return this._activeFarmland.asObservable().pipe(
      map(farmland => {
        if (farmland) {
          return farmland;
        } else {
          return null;
          // return Plugins.Storage.get({ key: "farmland" }).then(result => {
          //   farmland = JSON.parse(result.value);
          //   console.log(farmland);
          //   return farmland;
          //});
        }
      })
    );
  }

  startListenNetwork() {
    return Network.addListener('networkStatusChange', (status) => {
     // console.log('conectado:' + status.connected);
      this.status = status.connected;
    });
  }
  // Getters
  // farmland list
  getFarmlandList() {
    return this.authService.auth.pipe(
      switchMap(
        auth => {
          if (this.status) {
            //console.log('conectado farmland');
            const url = auth.domain + '/farmlands';
            return this.http.get(
              url,
              auth.header
              ).pipe(map( response => {
                  this._farmlandList = [];
                  response['data'].forEach(element => {
                    const farmland = new Farmland(
                      element.id,
                      element.name,
                      element.yesterdayTotal,
                      element.yesterdayPresent,
                      element.yesterdayAbsence,
                    );
                    this._farmlandList.push(farmland);
                  });
                  //storingconsole.log(auth.farmland);
                  console.log(auth.farmland);
                  if (auth.farmland == null) {
                    console.log('entre');
                    this.authService.setFarm(this._farmlandList[0].id);
                    this._activeFarmland.next(this._farmlandList[0]);
                  } else {
                    const activefarmland: Farmland = this._farmlandList.find(
                      farmland => {if (farmland.id == auth._farmland) {return true; }}
                      )[0];
                    this._activeFarmland.next(activefarmland);
                  }
                  this.storeFarmlandList(this._farmlandList);
                  return this._farmlandList;
                }));
          } else {
            return from(Plugins.Storage.get({ key: "farmlandList" })).pipe(map( storedFarmlands => {
              //console.log(storedFarmlands.value);
              const farmlands = JSON.parse(storedFarmlands.value);
              //console.log(farmlands);
              this._farmlandList = farmlands;
              return this._farmlandList;
            }));
          }
        }
      )
    );
  }
  // Active farmland
  getFarmland() {
    return this.authService.auth.pipe(
      switchMap(
        auth => {
          if (!auth.farmland) {
            return null;
          }
          if (this.status) {
            console.log('conectado farmland');
            const url = auth.domain + '/farmlands/' + auth.farmland;
            return this.http.get(
              url,
              auth.header
              ).pipe(map( response => {
                  const element = response['data'];
                  const farmland = new Farmland(
                    element.id,
                    element.name,
                    element.yesterdayTotal,
                    element.yesterdayPresent,
                    element.yesterdayAbsence,
                  );
                  //storing
                  this._activeFarmland.next(farmland);
                  this.storeFarmland(farmland);
                  return farmland;
                }));
          } else {
            return from(Plugins.Storage.get({ key: "farmland" })).pipe(map( storedFarmland => {
              const farmland = JSON.parse(storedFarmland.value);
              return farmland;
            }));
          }
        }
      )
    );
  }

  // Storage
  private storeFarmlandList(farmlands: Farmland[]) {
    Plugins.Storage.set({ key: "farmlandList", value: JSON.stringify(farmlands) });
  }
  private storeFarmland(farmland: Farmland) {
    Plugins.Storage.set({ key: "farmland", value: JSON.stringify(farmland) });
  }

  public farmlandFromStorage() {
    return from(Plugins.Storage.get({ key: "farmland" })).pipe(map( 
      storedFarmland => {
      const farmland = JSON.parse(storedFarmland.value);
      this._activeFarmland.next(farmland);
      return farmland;
      }
    ));
  }

}
