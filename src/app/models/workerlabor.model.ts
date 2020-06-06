import { Labor, LaborType } from './labor.model';
import { CostCenter } from './costcenter.model';


export class WorkerLabor {

    constructor(
        public id: number,
        public workerId: number,
        public workerDayId: number,
        public status: number,
        public costCenter: CostCenter,
        public labor: Labor,
        public laborType: LaborType,
        public quantity: number,
        public value: number,
        public total =  value * quantity,
        ​​​public totalBonuses: number
    ) {}

}

// export class WorkerLaborBonus {

//     constructor(
//         public id: number,
//         public bonus: number,

//     ) {}

// }