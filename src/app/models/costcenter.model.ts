export class CostCenter {

    constructor(
        public id: string,
        public name: string,
        public description?: string,
        public farmland?: string,
        public specieVarietyName?: string,
        public todayLabors?: number,
        public todayWorkerDays?: number,
        public todayTotal?: number,
    ) {}


}


