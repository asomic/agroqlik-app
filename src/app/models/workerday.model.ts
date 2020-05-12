import { WorkerLabor } from '../models/workerlabor.model';


export class WorkerDay {

    constructor(
        public id: number,
        public workerId: number,
        public farmlandId: number,
        public amount: string,
        public absence: boolean,
        public date: string,
        public labors: WorkerLabor[],
    ) {}

}
