import { Labor, LaborType } from './labor.model';
import { CostCenter } from './costcenter.model';


export class WorkerLabor {

    constructor(
        public id: number,
        public workerId: number,
        public workerDayId: number,
        public status: number,
        public costCenter: CostCenter,
        public cuadrilla: number,
        public labor: Labor,
        public laborType: LaborType,
        public quantity: number,
        public value: number,
        public production: number,
        ​​​public colacion: number,
        ​​​public transporte: number,
        ​​​public produccion: number,
        public otro: number,
        public total =  value * quantity + colacion + transporte + produccion + otro,
        
    ) {}

}

// export class WorkerLaborBonus {

//     constructor(
//         public id: number,
//         public bonus: number,

//     ) {}

// }