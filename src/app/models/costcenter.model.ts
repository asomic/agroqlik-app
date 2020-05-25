export class CostCenter {

    constructor(
        public id: string,
        public name: string,
        public description?: string,
        public varietyName?: string,
        public specieName?: string,
        public todayLabors?: number,
        public todayWorkerDays?: number,
        public todayTotal?: number,
    ) {}


}


