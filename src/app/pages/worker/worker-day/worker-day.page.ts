import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-worker-day',
  templateUrl: './worker-day.page.html',
  styleUrls: ['./worker-day.page.scss'],
})
export class WorkerDayPage implements OnInit {

  public activities = [
    {
      nombre: 'Poda',
      cuartel: 'Cuartel Fruta',
      tipoLabor: 'Trato',
      cantidadLabor: 1,
      bonos: [
        {
          tipo: 'Bono 1',
          valor: 2000
        }
      ]
    },
    {
      nombre: 'Podita',
      cuartel: 'Cuartel Fruta',
      tipoLabor: 'Trato',
      cantidadLabor: 1,
      bonos: [
        {
          tipo: 'Bono 1',
          valor: 2000
        },
        {
          tipo: 'Bono 2',
          valor: 4500
        }
      ]
    }
  ];

  showCollapsible: Array<boolean> = [];
  showEdit: Array<boolean> = [];
  showClose: Array<boolean> = [];

  toggleText = true;
  buttonText = 'Editar';

  constructor() {}
  ngOnInit() {}

  toggleCollapsible(i) {
    this.showCollapsible[i] = !this.showCollapsible[i];
    this.showEdit[i] = !this.showEdit[i];
    this.showClose[i] = !this.showClose[i];
  }



}
