export class WorkerLabor {

    constructor(
        public id: number,
        public costCenterId: number,
        public costCenterName: string,
        public workerId: number,
        public workerDayId: number,
        public laborId: number,
        public laborName: string,
        public laborTypeId: number,
        public laborTypeName: string,
        public status: number,
        public quantity: number,
        public value: number,
        public total: number,
        ​​​public totalBonuses: number
    ) {}

}