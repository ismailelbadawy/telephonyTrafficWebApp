export class GetTableFromParamsViewModel {
    public get row(): TrafficViewItem[] {
        return this._row;
    }
    
    constructor(
        private _row: TrafficViewItem[]
    ) {

    }
}

export class TrafficViewItem {
    public get trafficValues(): number[] {
        return this._trafficValues;
    }
    
    constructor(
        private _trafficValues: number[]
    ) {
        
    }
}